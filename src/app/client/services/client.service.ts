import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private apiUrl = environment.apiUrl;

  constructor(
    private httpClient: HttpClient
  ) { }


  getCategoryAggregated(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.apiUrl}/categories/aggregated`)
  }
}
