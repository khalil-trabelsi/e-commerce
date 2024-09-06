import { HttpClient } from '@angular/common/http';
import { computed, effect, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  
  private refreshDataSubj = new Subject<void>();
  refreshData = this.refreshDataSubj.asObservable()
  private api = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.api}/users`);
  }

  deleteUser(userId: number) {
    return this.httpClient.delete(`${this.api}/users/${userId}`)
  }


  refershUserList() {
    this.refreshDataSubj.next()
  }

  updateUser(user: User, userId: number): Observable<User> {
    return this.httpClient.put<User>(`${this.api}/users/${userId}`, user)
  }
}
