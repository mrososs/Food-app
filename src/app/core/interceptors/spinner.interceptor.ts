import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { SpinnerService } from '../../shared/services/spinner.service';
import { finalize } from 'rxjs';

export const spinnerInterceptor: HttpInterceptorFn = (req, next) => {
  const spinnerService = inject(SpinnerService);
  // Show spinner before sending request
  spinnerService.show();
  return next(req).pipe(finalize(() => spinnerService.hide()));
};
