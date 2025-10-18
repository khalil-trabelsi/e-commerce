import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  private apiUrl = `${environment.apiUrl}/api`
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

  signin(userCredentiels: {email: string, password: string}): Observable<{access_token: string, user: User, refresh_token: string}> {
    return this.httpClient.post<{access_token: string, user: User, refresh_token: string}>(`${this.apiUrl}/auth/login`, userCredentiels)
  }

  refreshToken(): Observable<{token: string}> {
    return this.httpClient.post<{ token: string }>(
      `${this.apiUrl}/auth/refresh_token`,
      {},
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.storageService.getRefreshToken()}`
        })
      }
    );
  }

  logout() {
    this.httpClient.post<any>(`${this.apiUrl}/auth/logout`, {user_id: this.storageService.getUser().id}).subscribe(
      {
        next: (data) => {
          console.log(data)
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
