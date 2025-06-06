import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
export const logedGuard: CanActivateFn = (route, state) => {
  if(typeof localStorage !== 'undefined'){
    if(localStorage.getItem('token') !== null){
      let userData: any = localStorage.getItem('token')!;
      userData = jwtDecode(userData);
      /* redirect to the home page */
      const _Router = inject(Router);
      if(userData.user?.role === 'user'){
        _Router.navigate(['/home']);
        return false;
      }else if(userData.user?.role === 'admin'){
      _Router.navigate(['/admin']);
      return false;
      }
    }
      return true;
  }else{
    return false;
  }
};
