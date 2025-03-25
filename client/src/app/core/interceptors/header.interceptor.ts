import { HttpInterceptorFn } from '@angular/common/http';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  if(localStorage.getItem('token') !== null){
    if(req.url.includes('cart')|| req.url.includes('orders'))
    req = req.clone({
      setHeaders: {
        'Authorization': `Bearer ${localStorage.getItem('token')!}`
      }
    })
  }
  return next(req);
};
