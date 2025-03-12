import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);

  // ✅ Ensure code only runs in the browser
  if (isPlatformBrowser(platformId)) {
    const token = localStorage.getItem('token');

    if (token) {
      const authReq = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });
      return next(authReq);
    }
  }

  return next(req);
};
