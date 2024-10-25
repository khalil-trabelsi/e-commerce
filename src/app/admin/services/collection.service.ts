import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  private refreshCollectionData$$ = new Subject<void>();
  public  refreshCollectionData$ = this.refreshCollectionData$$.asObservable()

  private apiUrl = environment.apiUrl

  constructor(
    private httpClient: HttpClient
  ) { }

  getCollections(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.apiUrl}/collections`)
  }

  addCollection(collection: any): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/collections`, collection)
  }

  refreshData() {
    this.refreshCollectionData$$.next()
  }
}
