import { HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, finalize, Observable, throwError } from 'rxjs';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { LoadingService } from './loading.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  private totalRequest = 0;
  constructor(
    private dialog: MatDialog,
    private loadingService: LoadingService,
    private cookieService: CookieService
  ) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.totalRequest++;
    this.loadingService.setLoading(true)
    const jwt = localStorage.getItem('jwt');
    let newRequest
    if (jwt) {
      newRequest = req.clone({
        withCredentials: true,
        headers: req.headers.set("Authorization", "Bearer " + jwt)

      })
    } 

    else {
      newRequest = req.clone({
        withCredentials: true,
      })
    }
    
    

      return next.handle(newRequest).pipe(
        catchError((err: any) => {
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
 
  
}

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
];