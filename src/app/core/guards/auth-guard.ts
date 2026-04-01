import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@coreservices/auth-service';

// Guard: Protects admin routes
export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.currentUser()) {
    return true; // User is logged in, allow access
  }

  // Redirect to login if not authenticated
  return router.parseUrl('/login');
};

// Guard: Redirects logged-in users away from the login page
export const guestGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.currentUser()) {
    return router.parseUrl('/admin'); // Already logged in, go to admin
  }

  return true; // Allow access to login page
};
