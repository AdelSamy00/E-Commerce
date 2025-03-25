import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import {jwtDecode} from 'jwt-decode'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

//constructor(private _HttpClient: HttpClient) { }
private readonly _HttpClient: HttpClient = inject(HttpClient);
private readonly _Router: Router = inject(Router);
userData: any = null;
registerSubmit(data: object): Observable<any> {
  return this._HttpClient.post(`${environment.BaseUrl}/auth/register`, data);
}
loginSubmit(data: object): Observable<any> {
  return this._HttpClient.post(`${environment.BaseUrl}/auth/login`, data);
}

getUserData(): Observable<any> {
  return this._HttpClient.get(`${environment.BaseUrl}/auth/`,{
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')!}`
    }
  });
}

saveUserData() {
  if(localStorage.getItem('token') !== null) {
    this.userData = jwtDecode(localStorage.getItem('token') !);
    console.log(this.userData);
  }
}

logout() {
  localStorage.removeItem('token');
  this.userData = null;
  this._Router.navigate(['/login']);
}

sendResetCode(data: object): Observable<any> {
  return this._HttpClient.post(`${environment.BaseUrl}/auth/forgotpassword`, data);
}

resetCodeVerification(data: object): Observable<any> {
  return this._HttpClient.post(`${environment.BaseUrl}/auth/verifyresetcode`, data);
}

resetPassword(data: object): Observable<any> {
  return this._HttpClient.put(`${environment.BaseUrl}/auth/resetpassword`, data);
}

}
