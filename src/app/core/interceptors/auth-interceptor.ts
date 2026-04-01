import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const token = '48372894792429842042';

  const authRequest = req.clone({
    setHeaders: {
      Authorizantion: `Bearer ${token}`,
    },
  });

  return next(authRequest);
};
