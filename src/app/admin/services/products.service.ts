import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = environment.apiUrl;
  private refreshProductsData$$ = new Subject<void>();
  refreshProductsData$ = this.refreshProductsData$$.asObservable();

  constructor(
    private httpClient: HttpClient
  ) { }

  addProduct(product: any) {
    return this.httpClient.post<any>(`${this.apiUrl}/products`, product);
  }

  uploadImages(productId: number, files: any): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/products/${productId}/upload`, files);
  } 

  getProducts():Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.apiUrl}/products`);
  }

  refreshProducts() {
    this.refreshProductsData$$.next();
  }
}
