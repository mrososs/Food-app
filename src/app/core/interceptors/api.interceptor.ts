import { HttpInterceptorFn } from '@angular/common/http';
const baseUrl = 'https://upskilling-egypt.com:3006/api/v1';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  let updateRequest = req;
  if (!req.url.includes('https')) {
    updateRequest = req.clone({
      url: `${baseUrl}${req.url}`,
    });
  }
  return next(updateRequest);
};
