import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private readonly _HttpClient: HttpClient = inject(HttpClient)

  cashPayment(data: object,cartId: string): Observable<any> {
    return this._HttpClient.post(`${environment.BaseUrl}/orders/${cartId}`, {shippingAddress: data});
  }
  onlinePayment(data: object,cartId: string): Observable<any> {
    return this._HttpClient.post(`${environment.BaseUrl}/orders/checkout-session/${cartId}?url=${environment.FrontUrl}`,
            {shippingAddress: data}
          );
  }

}
