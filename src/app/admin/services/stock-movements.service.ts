import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockMovementsService {

  private refreshStockMovements$$ = new Subject<void>()
  refreshStockMovements$ = this.refreshStockMovements$$.asObservable()

  private apiUrl = environment.apiUrl;

  constructor(
    private httpClient: HttpClient
  ) { }

  getStockMovements(filters?: Filters): Observable<any[]> {
    let params = new HttpParams();
    if (filters) {
      Object.entries(filters).forEach(
        ([key, value]) => {
          if (Array.isArray(value)) {
            value.forEach(item => {
              params = params.append(key, item.toString())
            })
          } else if (value && value !== '') {
            params = params.append(key, value.toString())
          }
        }
      )
      console.log(params)
      return this.httpClient.get<any[]>(`${this.apiUrl}/stock_movements`, {params});
    }
    return this.httpClient.get<any[]>(`${this.apiUrl}/stock_movements`);
  }

  addStockEntry(stockEntry: any): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/stock_movements`, stockEntry)
  }

  refreshStockMovements() {
    this.refreshStockMovements$$.next()
  }
  
}


interface Filters {
  [key: string]: string | number | boolean | (string | number)[];
}