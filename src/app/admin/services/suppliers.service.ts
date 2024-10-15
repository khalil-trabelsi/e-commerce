import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable, Subject } from 'rxjs';
import { Supplier } from '../models/Supplier';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class SuppliersService {
  private refreshSubject = new Subject<void>()
  refresh$ = this.refreshSubject.asObservable()

  apiUrl = environment.apiUrl;

  constructor(
    private httpClient: HttpClient
  ) {
    console.log(this.apiUrl)
   }

  getSuppliers(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.apiUrl}/suppliers`);
  }


  addSupplier(supplier: any): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/suppliers`, supplier)
  }

  editSupplier(supplierId: number, supplier: any): Observable<any> {
    return this.httpClient.put<any>(`${this.apiUrl}/suppliers/${supplierId}`, supplier)
  }

  deleteSupplier(supplierId: number) {
    return this.httpClient.delete(`${this.apiUrl}/suppliers/${supplierId}`);
  }


  refreshSuppliersData() {
    this.refreshSubject.next();
  }
}
