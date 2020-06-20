import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { Observable, empty } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { AuthServiceService } from './auth-service.service';
import { Router } from '@angular/router';
import { error } from 'protractor';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private auth: AuthServiceService, private notify: NotificationService,private route:Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = this.auth.signalR.Auth.tokenGetter();
    if (!!token) {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      })
    }
    return next.handle(req).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
              this.route.navigate(['./account/login']);
          }
          if (!!error.error) {
            if (error.error.message) {
              this.notify.showNotification(error.error.message);
            }
            else if (error.error instanceof Object) {
              let msg = '';
              for (const errormes in error.error) {
                error.error[errormes].forEach(element => {
                  msg += element + "\n";
                });
              }
              this.notify.showNotification(msg);
            }
          }
        }
        else {
          console.error(error.message);
        }
        return empty();
      }),
      finalize(() => {

      })
    );
  }
}
