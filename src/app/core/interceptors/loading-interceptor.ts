import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { delay, finalize } from 'rxjs';
import { LoadingService } from '../services/loading-service';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);

  // Spustíme loader pri štarte requestu
  loadingService.show();

  return next(req).pipe(
    delay(1000),
    finalize(() => loadingService.hide()),
  );
};
