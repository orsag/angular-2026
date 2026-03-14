import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  map,
  shareReplay,
  startWith,
  tap,
} from 'rxjs';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  company: { name: string };
}

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private http = inject(HttpClient);

  // 1. Data Stream (The Source)
  private users$ = this.http.get<User[]>(API_URL).pipe(
    shareReplay(1), // Cache the result so we don't hit the API multiple times
  );

  // 2. Action Streams (The State)
  loading$ = new BehaviorSubject<boolean>(false);
  searchSubject = new BehaviorSubject<string>('');
  filterSubject = new BehaviorSubject<string>('all');

  // 3. The Search Stream: We add debounce and startWith here
  private debouncedSearch$ = this.searchSubject.asObservable().pipe(
    tap(() => this.loading$.next(true)),
    startWith(''), // Ensure it has a value immediately
    debounceTime(300), // Wait for 300ms pause in typing
    distinctUntilChanged(), // Only emit if the text actually changed
    tap(() => this.loading$.next(false)),
  );

  // 4. The Filter Stream: Just needs an initial value
  private initialFilter$ = this.filterSubject.asObservable().pipe(startWith('all'));

  // 5. The combined stream
  filteredUsers$ = combineLatest([this.users$, this.debouncedSearch$, this.initialFilter$]).pipe(
    map(([users, search, filter]) => {
      return users.filter((user) => {
        const matchesSearch = user.name.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter === 'all' || user.email.endsWith(filter); // Filtering by email domain as a proxy for "status"
        return matchesSearch && matchesFilter;
      });
    }),
  );
}
