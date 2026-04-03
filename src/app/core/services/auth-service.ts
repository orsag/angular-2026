import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@types';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  public currentUser = signal<User | null>(null);

  // auth.service.ts
  login(email: string, pass: string): Observable<{ user: User; success: boolean; token: string }> {
    return this.http
      .post<{ user: User; success: boolean; token: string }>('/api/user/login', { email, pass })
      .pipe(
        tap((response) => {
          if (response.success) {
            // localStorage.setItem('user', JSON.stringify(response.user));
            this.currentUser.set(response.user);
          }
        }),
      );
  }

  logout(): void {
    this.http.post('/api/user/logout', {}).subscribe(() => {
      this.currentUser.set(null);
      this.router.navigate(['/login']);
    });
  }
}
