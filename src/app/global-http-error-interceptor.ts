import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, retry, tap, throwError } from 'rxjs';
import { NotificationService } from './Services/notification-service';

export const globalHttpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const notify = inject(NotificationService);

  return next(req).pipe(
    retry({ count: 2, delay: 1000 }),
    tap({
      error: (error: HttpErrorResponse) => {
        if ([500].includes(error.status)) {
          notify.show('Server error', 'danger');
        } else {
          notify.show(error.message, 'danger');
        }
      },
    }),
    // catchError((error: HttpErrorResponse) => {
    //   return throwError(() => error);
    // }),
  );
};
