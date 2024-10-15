import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Category } from '../models/category';
import { map, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  apiUrl = environment.apiUrl;
  private refreshCategoriesSubject = new Subject<void>();
  refreshCategories = this.refreshCategoriesSubject.asObservable()


  constructor(
    private httpClient: HttpClient,
  ) { }

  getAllCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(`${this.apiUrl}/categories`).pipe(map(data => data.sort((a, b) => a.name.localeCompare(b.name))))
  }

  refreshCategoriesData() {
    this.refreshCategoriesSubject.next()
  }

  addCategory(category: Category): Observable<Category> {
    return this.httpClient.post<Category>(`${this.apiUrl}/categories`, category);
  }

  


}
