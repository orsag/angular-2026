import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './Services/auth-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);

  const authRequest = req.clone({
    setHeaders: {
      Authorizantion: `Bearer ${auth.getToken()}`,
    },
  });

  return next(authRequest);
};
