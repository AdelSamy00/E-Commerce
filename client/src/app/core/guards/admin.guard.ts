import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

export const adminGuard: CanActivateFn = (route, state) => {
  if(typeof localStorage !== 'undefined'){
    const _Router = inject(Router);
    if(localStorage.getItem('token') !== null) {
      let userData: any = localStorage.getItem('token')!;
      userData = jwtDecode(userData);
      if(userData.user?.role === 'admin'){
        return true;
      }else{
        /* redirect to the login page */
        _Router.navigate(['/home']);
        return false;
      }
    };
  /* redirect to the login page */
  _Router.navigate(['/login']);
  return false;
  }else{
    return false;
  }
};
