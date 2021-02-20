import {TestBed} from '@angular/core/testing';
import {HttpErrorInterceptor} from './http-error.interceptor';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TokenService} from '../_services/token.service';
import SpyObj = jasmine.SpyObj;
import {AlertService} from '../_services/alert.service';


describe('HttpErrorInterceptor', () => {

  let errorInterceptor: HttpErrorInterceptor;
  let alertService: SpyObj<AlertService>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: AlertService, useValue: jasmine.createSpyObj('AlertService', ['error'])},
        HttpErrorInterceptor,
        TokenService,
      ],
      imports: [HttpClientTestingModule, MatSnackBarModule],
    });
    errorInterceptor = TestBed.inject(HttpErrorInterceptor);
    alertService = TestBed.inject(AlertService) as SpyObj<AlertService>;
  });

  xit('saveToken should save token correct', () => {
    // given
    const requestMock: SpyObj<HttpRequest<any>> = jasmine.createSpyObj('HttpRequest', ['']);
    const handlerMock: SpyObj<HttpHandler> = jasmine.createSpyObj('HttpHandler', ['handle']);
    const errMsg = 'A err msg';
    const response = new HttpErrorResponse({status: 500, statusText: errMsg});
    handlerMock.handle.and.returnValue(throwError(response));

    // when
    errorInterceptor.intercept(requestMock, handlerMock).subscribe();

    // then
    expect(alertService.error).toHaveBeenCalled();
    // expect(alertService.error).toHaveBeenCalledWith(errMsg);
  });

});
