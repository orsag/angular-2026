import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Employee } from '@types';
import { catchError, map, Observable, of, Subject, switchMap, tap } from 'rxjs';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

@Injectable({
  providedIn: 'root',
})
export class SharedData {
  http = inject(HttpClient);

  // constructor(private _http: HttpClient) {}

  userData = {
    id: 1,
    name: 'John',
    username: 'john',
    email: 'john@gmail.com',
    subscription: 'basic',
  };

  // declarative data access patern
  users$ = this.http.get<Employee[]>(API_URL).pipe(
    // tap((users) => console.log(JSON.stringify(users))),
    catchError((error: HttpErrorResponse): Observable<Employee[]> => {
      return this.handleError(error);
    }),
  );

  filteredUsers$ = this.users$.pipe(
    // tap((users) => console.log(users)),
    map((users) => this.customFiltering(users)),
  );

  customFiltering(users: Employee[]) {
    return users.filter((user) => user.username.length > 10);
  }

  private handleError(error: HttpErrorResponse): Observable<Employee[]> {
    console.error('An error occurred:', error.message);
    // Option A: Return a safe empty list so the UI doesn't crash
    return of([]);
    // Option B: Re-throw if you want a global handler to catch it
    // return throwError(() => new Error('Something went wrong.'));
  }

  private categorySubject = new Subject<number>();
  userSelectedAction$ = this.categorySubject.asObservable();

  selectedCategoryChange(categoryId: number) {
    this.categorySubject.next(categoryId);
  }

  selectedUser$ = this.userSelectedAction$.pipe(
    switchMap((userId) =>
      this.http.get<Employee>(`${API_URL}/${userId}`).pipe(
        tap((data) => console.log(data)),
        catchError((error: HttpErrorResponse): Observable<Employee[]> => {
          return this.handleError(error);
        }),
      ),
    ),
  );

  getUserData() {
    return this.http.get<Employee[]>(API_URL);
  }
}
