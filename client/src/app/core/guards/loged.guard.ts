import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
export const logedGuard: CanActivateFn = (route, state) => {
  if(typeof localStorage !== 'undefined'){
    if(localStorage.getItem('token') !== null){
      /* redirect to the home page */
      const _Router = inject(Router);
      _Router.navigate(['/home']);
      return false;
    }
      return true;
  }else{
    return false;
  }
};
