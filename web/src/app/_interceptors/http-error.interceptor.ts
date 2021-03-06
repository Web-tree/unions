import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {AlertService} from '../_services/alert.service';
import {AuthService} from '../_services/auth.service';
import {catchError} from 'rxjs/operators';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(
    private alertService: AlertService,
    private authService: AuthService
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((response: HttpErrorResponse) => {
        console.log(response);
        if (response.status === 401) {
          this.alertService.error('Your session expired. Please login again.');
          this.authService.logout();
        } else if (response.status === 0 || response.status.toString().startsWith('5') || response.status.toString().startsWith('4')) {
            if (response.error) {
              this.alertService.error(response.error);
            } else {
              this.alertService.error(response.message);
            }
        }
        return throwError(response);
      })
    );
  }
}

export const HttpErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: HttpErrorInterceptor,
  multi: true,
};
