import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { map, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  private refreshCustomersDataSubject = new Subject<void>();
  refreshCustomers = this.refreshCustomersDataSubject.asObservable();


  private apiUrl = environment.apiUrl;

  constructor(
    private httpClient: HttpClient
  ) { }

  getAllCustomers(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.apiUrl}/customers`).pipe(map(data => data.sort((a, b)=> a.first_name.localeCompare(b.first_name))));
  }
  
  editCustomer(customer: any) {
    return this.httpClient.put(`${this.apiUrl}/customers/${customer.id}`, customer);
  }

  activeCustomer(customerId: number) {
    return this.httpClient.put(`${this.apiUrl}/customers/${customerId}`, {status: 'active'});
  }

  deactivateCustomer(customerId: number) {
    return this.httpClient.put(`${this.apiUrl}/customers/${customerId}`, {status: 'inactive'});
  }

  banCustomer(customerId: number) {
        return this.httpClient.put(`${this.apiUrl}/customers/${customerId}`, {status: 'banned'});
  }

  refreshCustomersData() {
    this.refreshCustomersDataSubject.next();
  }



}
