import { HttpClient } from '@angular/common/http';
import { effect, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {


  private readonly _httpClient: HttpClient = inject(HttpClient);
  cartCount:WritableSignal<number> = signal(0);
  constructor() {
    effect(()=>{
      localStorage.setItem('cartCount', this.cartCount().toString());
    });
  }
  getCart(): Observable<any> {
    return this._httpClient.get(`${environment.BaseUrl}/carts/`);
  }

  addToCart(productId: string): Observable<any> {
    console.log(productId);
    return this._httpClient.post(`${environment.BaseUrl}/carts/`, {productId});
  }

  updateCart(productId: string, quantity: number): Observable<any> {
    return this._httpClient.put(`${environment.BaseUrl}/carts/${productId}`, { quantity });
  }

  removeItemFromCart(productId: string): Observable<any> {
    return this._httpClient.delete(`${environment.BaseUrl}/carts/${productId}`);
  }

  deleteCart(): Observable<any> {
    return this._httpClient.delete(`${environment.BaseUrl}/carts/`);
  }


}
