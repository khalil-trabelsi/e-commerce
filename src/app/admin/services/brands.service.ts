import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Brand } from '../models/brands';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {
  private apiUrl = environment.apiUrl;
  private refreshBrandsSubject = new Subject<void>();
  refreshBrands = this.refreshBrandsSubject.asObservable();

  constructor(
    private httpClient: HttpClient
  ) { }

  getAllBrands(): Observable<Brand[]> {
    return this.httpClient.get<Brand[]>(`${this.apiUrl}/brands`)
  }

  addBrand(brand: Brand): Observable<Brand> {
    return this.httpClient.post<Brand>(`${this.apiUrl}/brands`, brand)
  }


  refreshBrandData() {
    this.refreshBrandsSubject.next()
  }

  uploadImage(brand_id: number, file: any): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/brands/${brand_id}/upload`, file)
  }
}
