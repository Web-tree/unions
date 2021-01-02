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
import {isValidationError} from '@webtree/unions-common/lib/validators/validate';
import {ValidationError} from 'class-validator';

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
        if (response.status === 401) {
          this.alertService.error('Your session expired. Please login again.');
          this.authService.logout();
        } else if (response.status === 0 || response.status.toString().startsWith('5') || response.status.toString().startsWith('4')) {
          let e: ValidationError[] = response.error;
          if (isValidationError(e)) {
            for (let errorElement of e) {
              for (let constraintsKey in errorElement.constraints) {
                this.alertService.error(constraintsKey + ": " + errorElement.constraints[constraintsKey]);
              }
            }
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
