import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private readonly _HttpClient: HttpClient = inject(HttpClient);

  getCategories() : Observable<any> {
    return this._HttpClient.get(`${environment.BaseUrl}/categories`);
  }

  getCategoryById(id: string) : Observable<any> {
    return this._HttpClient.get(`${environment.BaseUrl}/categories/${id}`);
  }

}
