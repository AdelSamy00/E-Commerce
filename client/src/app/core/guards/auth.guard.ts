import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

export const authGuard: CanActivateFn = (route, state) => {
  if(typeof localStorage !== 'undefined'){
    if(localStorage.getItem('token') !== null) return true;
  const _Router = inject(Router);
  /* redirect to the login page */
  _Router.navigate(['/login']);
  return false;
  }else{
    return false;
  }
};
