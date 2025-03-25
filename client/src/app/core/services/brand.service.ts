import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  private readonly _HttpClient: HttpClient = inject(HttpClient);

  getBrands() : Observable<any>{
    return this._HttpClient.get(`${environment.BaseUrl}/brands`);
  }
  getBrandById(id: string) : Observable<any> {
      return this._HttpClient.get(`${environment.BaseUrl}/brands/${id}`);
  }

  getProductsForSpecificBrand(page: number = 1, limit: number = 8, brandId: string) : Observable<any> {
    return this._HttpClient.get(`${environment.BaseUrl}/products?page=${page}&limit=${limit}&brandId=${brandId}`);
  }

}
