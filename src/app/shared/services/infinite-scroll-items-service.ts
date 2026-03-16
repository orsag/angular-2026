import { Inject, inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  BehaviorSubject,
  map,
  scan,
  switchMap,
  tap,
  zip,
  timer,
  Observable,
  Subject,
  merge,
  shareReplay,
  observeOn,
  asyncScheduler,
  distinctUntilChanged,
  catchError,
  exhaustMap,
  finalize,
  of,
} from 'rxjs';
import { InfiniteScrollConfig } from '@types';

export const INFINITE_SCROLL_CONFIG = 'INFINITE_SCROLL_CONFIG';

@Injectable()
export class InfiniteScrollingService<T extends { id: string | number }> {
  private http = inject(HttpClient);
  public savedScrollPosition = 0;

  constructor(@Inject(INFINITE_SCROLL_CONFIG) private config: InfiniteScrollConfig) {
    this.pageSubject.next(config.initialPage ?? 1);
  }

  // 1. A subject to track the current page
  private pageSubject = new BehaviorSubject<number>(1);
  private refreshSubject = new Subject<void>();
  loading$ = new BehaviorSubject<boolean>(false);

  allItems$ = merge(
    // 1. Standard Pagination Logic
    this.pageSubject.pipe(
      distinctUntilChanged(),
      map((page) => ({ type: 'LOAD' as const, page })),
    ),
    // 2. The Smart Buffer Refresh Logic
    this.refreshSubject.pipe(
      // exhaustMap ensures if a refresh is in progress, new clicks are ignored
      exhaustMap(() =>
        // We return the fetchData call here so exhaustMap knows when it finishes
        this.fetchData(1).pipe(
          map((data) => ({ type: 'RESET' as const, data })),
          // Reset the page subject internally so future 'Next Page' calls start from 2
          tap(() => this.pageSubject.next(1)),
        ),
      ),
    ),
  ).pipe(
    observeOn(asyncScheduler),
    // Start loading for LOAD actions (Refresh handles its own loading via exhaustMap/fetchData)
    tap((action) => {
      if (action.type === 'LOAD') this.loading$.next(true);
    }),
    switchMap((action) => {
      // If it's a RESET, the data is already fetched by the exhaustMap above
      if (action.type === 'RESET') return of(action);

      // If it's a LOAD, fetch it normally
      return this.fetchData(action.page).pipe(map((data) => ({ type: 'LOAD' as const, data })));
    }),
    scan((acc: T[], curr: any) => {
      if (curr.type === 'RESET') return curr.data;

      const existingIds = new Set(acc.map((c) => c.id));
      const uniqueNewData = curr.data.filter((c: T) => !existingIds.has(c.id));
      return [...acc, ...uniqueNewData];
    }, []),
    tap(() => this.loading$.next(false)),
    shareReplay(1),
  );

  private fetchData(page: number): Observable<T[]> {
    let params = new HttpParams().set('_page', page).set('_limit', this.config.pageSize);
    if (this.config.params) {
      Object.entries(this.config.params).forEach(([key, value]) => {
        params = params.set(key, value);
      });
    }
    const apiCall$ = this.http.get<T[]>(this.config.url, { params });
    const minDelay$ = timer(1000);
    return zip(apiCall$, minDelay$).pipe(map(([data, _]) => data));
  }

  loadNextPage() {
    // Only load next page if we aren't currently filtering
    if (!this.loading$.value) {
      const nextPage = this.pageSubject.value + 1;
      this.pageSubject.next(nextPage);
    }
  }

  refresh() {
    this.refreshSubject.next(); // Trigger the scan reset
  }
}
