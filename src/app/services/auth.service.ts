import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl
  constructor(
    private httpClient: HttpClient
  ) { }

  role = signal('')

  register(user: any) {
    return this.httpClient.post(`${this.apiUrl}/auth/register`, user)
  }

  signin(userCredentiels: {email: string, password: string}): Observable<{token: string, user: User}> {
    return this.httpClient.post<{token: string, user: User}>(`${this.apiUrl}/auth/login`, userCredentiels,)
  }


  setRole(role: string) {
    this.role.set(role) 
  }
}
