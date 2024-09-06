import { HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, catchError, filter, finalize, Observable, switchMap, take, throwError } from 'rxjs';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { LoadingService } from './loading.service';
import { StorageService } from './storage.service';
import { AuthService } from '../services/auth.service';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private isRefreshing = false;
  private totalRequest = 0;
  constructor(
    private dialog: MatDialog,
    private loadingService: LoadingService,
    private storageService: StorageService,
    private authService: AuthService
  ) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.totalRequest++;
    this.loadingService.setLoading(true)
    const jwt = this.storageService.getToken();
    let newRequest = req.clone({withCredentials: true});
    if (jwt) {
      newRequest = this.addTokenHeader(req, jwt);
    } 
 
      return next.handle(newRequest).pipe(
        catchError((err: any) => {
          if (err instanceof HttpErrorResponse && !newRequest.url.includes('auth/logout') && !newRequest.url.includes('auth/login') && err.status === 401) {
            console.log('run')
            return this.handle401Error(newRequest, next);
          }
          let errMsg = '';
          let statusCode = err.status;
          if(err instanceof HttpErrorResponse) {
            if (err.error.message) {
              errMsg = err.error.message
            } else if (err.error.error) {
              errMsg = err.error.error;
            }
            console.log(err)
            console.log(err)
            this.dialog.open(ErrorDialogComponent, {
              width: '450px',
              height: '300px',
              data: {
                title: `Error ${statusCode}`,
                message: errMsg
              }
            })
          }
          return throwError(() => err)
        }),
        finalize(()=> {
          this.totalRequest--;
          if (this.totalRequest === 0) {
            this.loadingService.setLoading(false)
          }
        })
      )
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {

    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      return this.authService.refreshToken()
      .pipe(
        switchMap(value => {
          this.isRefreshing = false;
          this.storageService.saveToken(value.token);
          return next.handle(this.addTokenHeader(request, value.token));
          
        }),
        catchError((err: any)=> {
          this.isRefreshing = false;
          this.authService.logout()
          return throwError(() => err)
        })
      )
    }
    return this.refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap((token) => next.handle(this.addTokenHeader(request, token)))
    );
  }


  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({ headers: request.headers.set("Authorization", "Bearer " + token), withCredentials: true });
  }
 
  
}

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
];