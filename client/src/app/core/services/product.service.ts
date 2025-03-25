import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { IProduct } from '../interfaces/IProduct';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly _HttpClient: HttpClient = inject(HttpClient);
  products: IProduct[] = [];

  getProducts(page: number = 1, limit: number = 8, categoryId?: string) : Observable<any> {
    if (categoryId) {
      return this._HttpClient.get(`${environment.BaseUrl}/products?page=${page}&limit=${limit}&categoryId=${categoryId}`);
    }
    return this._HttpClient.get(`${environment.BaseUrl}/products?page=${page}&limit=${limit}`);
  }

  getProductById(id: string) : Observable<any> {
    return this._HttpClient.get(`${environment.BaseUrl}/products/${id}`);
  }

}
