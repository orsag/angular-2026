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
    this.pageSubject.pipe(
      distinctUntilChanged(),
      map((page) => ({ type: 'LOAD' as const, page })),
    ),
    this.refreshSubject.pipe(map(() => ({ type: 'RESET' as const, page: 1 }))),
  ).pipe(
    observeOn(asyncScheduler),
    tap(() => this.loading$.next(true)),
    switchMap((action) =>
      this.fetchData(action.page).pipe(map((data) => ({ type: action.type, data }))),
    ),
    scan((acc: T[], curr: any) => {
      // 3. Optional: Add a final check to prevent ID duplicates just in case
      if (curr.type === 'RESET') return curr.data;

      const existingIds = new Set(acc.map((c) => c.id));
      const uniqueNewData = curr.data.filter((c: T) => !existingIds.has(c.id));
      return [...acc, ...uniqueNewData];
    }, []),
    tap(() => this.loading$.next(false)),
    shareReplay(1),
  );

  private fetchData(page: number): Observable<T[]> {
    let params = new HttpParams()
      .set('_page', this.pageSubject.value)
      .set('_limit', this.config.pageSize);
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
      this.pageSubject.next(this.pageSubject.value + 1);
    }
  }

  refresh() {
    this.pageSubject.next(1); // Reset internal page counter
    this.refreshSubject.next(); // Trigger the scan reset
  }
}
