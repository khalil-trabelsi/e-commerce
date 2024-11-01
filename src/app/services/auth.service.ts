import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable, Subject } from 'rxjs';
import { User } from '../models/user';
import { StorageService } from '../helpers/storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  private destroy$ = new Subject<void>()
  private apiUrl = environment.apiUrl
  constructor(
    private httpClient: HttpClient,
    private storageService: StorageService,
    private router: Router
  ) { }

  register(user: any): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/auth/register`, user)
  }

  registerCustomer(customer: any): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/auth/register`, customer)
  }

  confirmMail(token: any): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/auth/confirm/${token}`)
  }

  signin(userCredentiels: {email: string, password: string}): Observable<{token: string, user: User}> {
    return this.httpClient.post<{token: string, user: User}>(`${this.apiUrl}/auth/login`, userCredentiels,)
  }

  refreshToken(): Observable<{token: string}> {
    return this.httpClient.get<{token: string}>(`${this.apiUrl}/auth/refresh_token`);
  }

  logout() {
    this.httpClient.get(`${this.apiUrl}/auth/logout`).subscribe(
      {
        next: (data) => {
          this.storageService.clean();
          this.router.navigate(['/auth/login']);
        },
        error: err => {
          console.log(err)
        }
      }
    )
  }
  

  ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
  }
}
