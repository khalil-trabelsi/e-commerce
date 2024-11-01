import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { map, Observable, Subject, tap } from 'rxjs';
import { Customer } from '../models/customer';

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
    return this.httpClient.get<any[]>(`${this.apiUrl}/customers`).pipe(tap(customers => console.log(customers)));
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

  addShippingAddress(address: any) {
    return this.httpClient.post<any>(`${this.apiUrl}/shipping`, address)
  }
  
  editShippingAddress(customer_id: number, address: any) {
    return this.httpClient.put<any>(`${this.apiUrl}/customers/${customer_id}/shipping_address`, address)
  }

  getShippingAddressByCustomerId(customerId: number) {
    return this.httpClient.get<any>(`${this.apiUrl}/customers/${customerId}/shipping_address`)
  }

  addCustomer(customer: Customer): Observable<Customer> {
    return this.httpClient.post<Customer>(`${this.apiUrl}/customers`, customer);
  }

}
