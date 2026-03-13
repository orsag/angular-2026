import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  combineLatest,
  debounceTime,
  observeOn,
  asyncScheduler,
  distinctUntilChanged,
} from 'rxjs';

export interface Comment {
  id: number;
  name: string;
  email: string;
  body: string;
}

@Injectable({
  providedIn: 'root',
})
export class InfiniteCommentService {
  private http = inject(HttpClient);
  private API = 'https://jsonplaceholder.typicode.com/comments';

  // save scroll position
  public savedScrollPosition = 0;

  // 1. A subject to track the current page
  private searchSubject = new BehaviorSubject<string>('');
  private pageSubject = new BehaviorSubject<number>(1);
  private refreshSubject = new Subject<void>();
  loading$ = new BehaviorSubject<boolean>(false);

  // The stream logic
  private allComments$ = merge(
    // 1. Only trigger LOAD if the page number actually CHANGES
    this.pageSubject.pipe(
      distinctUntilChanged(),
      map((page) => ({ type: 'LOAD' as const, page })),
    ),
    this.refreshSubject.pipe(map(() => ({ type: 'RESET' as const, page: 1 }))),
  ).pipe(
    observeOn(asyncScheduler),
    // 2. CRITICAL: If we already have shareReplay data,
    // don't restart the loading spinner for the initial subscription
    tap(() => this.loading$.next(true)),

    switchMap((action) =>
      this.fetchComments(action.page).pipe(map((data) => ({ type: action.type, data }))),
    ),
    scan((acc: Comment[], curr: any) => {
      // 3. Optional: Add a final check to prevent ID duplicates just in case
      if (curr.type === 'RESET') return curr.data;

      const existingIds = new Set(acc.map((c) => c.id));
      const uniqueNewData = curr.data.filter((c: Comment) => !existingIds.has(c.id));
      return [...acc, ...uniqueNewData];
    }, []),
    tap(() => this.loading$.next(false)),
    shareReplay(1),
  );

  private fetchComments(page: number): Observable<Comment[]> {
    const apiCall$ = this.http.get<Comment[]>(`${this.API}?_page=${page}&_limit=10`);
    const minDelay$ = timer(1000); // 1 second "breathing room"

    // zip waits for BOTH to finish, then emits
    return zip(apiCall$, minDelay$).pipe(map(([data, _]) => data));
  }

  // 2. The FILTERED stream (What the UI actually sees)
  // This combines the current list with the search term
  filteredComments$ = combineLatest([
    this.allComments$,
    this.searchSubject.pipe(debounceTime(300)), // Wait 300ms for user to stop typing
  ]).pipe(
    map(([comments, term]) => {
      if (!term.trim()) return comments;
      const lowerTerm = term.toLowerCase();
      return comments.filter(
        (c) =>
          c.body.toLowerCase().includes(lowerTerm) ||
          c.email.toLowerCase().includes(lowerTerm) ||
          c.name.toLowerCase().includes(lowerTerm),
      );
    }),
  );

  loadNextPage() {
    // Only load next page if we aren't currently filtering
    if (!this.loading$.value && this.searchSubject.value === '') {
      this.pageSubject.next(this.pageSubject.value + 1);
    }
  }

  updateSearch(term: string) {
    this.searchSubject.next(term);
  }

  refresh() {
    this.searchSubject.next('');
    this.pageSubject.next(1); // Reset internal page counter
    this.refreshSubject.next(); // Trigger the scan reset
  }
}
