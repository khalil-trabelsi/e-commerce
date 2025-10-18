import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { CustomerOrder } from '../models/customer-order';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerOrderService {
  apiUrl = `${environment.apiUrl}/api`;
  constructor(
    private httpClient: HttpClient
  ) { }

  createStripeCheckoutSession(data: {
    amount: number, 
    currency: string, 
    email: string, 
    metadata: {order_id: number | string | undefined}
  }): Observable<{"checkout_url": string}> {
    return this.httpClient.post<{'checkout_url': string}>(`${this.apiUrl}/payment/create-checkout-session`, data)
  }

  getAllOrders(): Observable<CustomerOrder[]> {
    return this.httpClient.get<CustomerOrder[]>(`${this.apiUrl}/customer-orders`)
  }

  getOrdersByCustomerId(customerId: number): Observable<CustomerOrder[]> {
    return  this.httpClient.get<CustomerOrder[]>(`${this.apiUrl}/users/${customerId}/orders`)
  }

  saveOrder(order: CustomerOrder): Observable<CustomerOrder> {
    return this.httpClient.post<CustomerOrder>(`${this.apiUrl}/customer-orders`, order);
  }

}
