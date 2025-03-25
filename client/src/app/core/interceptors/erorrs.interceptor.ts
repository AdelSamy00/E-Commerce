import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';


export const erorrsInterceptor: HttpInterceptorFn = (req, next) => {
  const _ToastrService:ToastrService = inject(ToastrService)
  return next(req).pipe(catchError((err)=>{
    // logic for error
    console.log('Interceptor ',err);
    // Alert Tostar
    if(err.message.includes('Http failure response')){
      _ToastrService.error('Http failure response: 404',"Fresh Cart")
    }else{
      _ToastrService.error(err.message,"Fresh Cart")
    }
    return throwError(() => err);
  }))
};
