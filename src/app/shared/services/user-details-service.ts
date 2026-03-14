import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, forkJoin, switchMap, tap, of } from 'rxjs';

export interface Post {
  id: number;
  title: string;
  body: string;
}
export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

@Injectable({ providedIn: 'root' })
export class UserDetailsService {
  private http = inject(HttpClient);
  private API = 'https://jsonplaceholder.typicode.com';

  // State: The ID of the user we want to inspect
  private selectedUserId = new BehaviorSubject<number | null>(null);

  // Loading state
  loadingDetails$ = new BehaviorSubject<boolean>(false);

  // The Magic Stream
  userDetails$ = this.selectedUserId.asObservable().pipe(
    tap((id) => id && this.loadingDetails$.next(true)),
    switchMap((id) => {
      if (!id) return of(null);

      // forkJoin runs these in PARALLEL
      return forkJoin({
        posts: this.http.get<Post[]>(`${this.API}/users/${id}/posts`),
        todos: this.http.get<Todo[]>(`${this.API}/users/${id}/todos`),
      }).pipe(tap(() => this.loadingDetails$.next(false)));
    }),
  );

  selectUser(id: number) {
    this.selectedUserId.next(id);
  }
}
