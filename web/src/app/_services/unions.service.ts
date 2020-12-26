import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Union} from '../_models/union';

@Injectable({
  providedIn: 'root'
})
export class UnionsService {

  // private isNotFoundError = (reason: any): boolean => reason instanceof HttpErrorResponse && reason.status === 404;
  // isExists(name: string): Promise<boolean> {
  //   return Promise.resolve<any>((resolve: any, reject: any) => {
  //     return this.get(name)
  //       .then(() => resolve(true))
  //       .catch(reason => this.isNotFoundError(reason) ? resolve(false) : reject(reason));
  //   });
  // }

  constructor(
    private httpClient: HttpClient
  ) {
  }

  // getList(): Promise<Data[]> {
  //   return this.httpClient.get<Data[]>(environment.backendUrl + '/data').toPromise();
  // }

  add(union: Union): Promise<any> {
    return this.httpClient.put(environment.back.create, union).toPromise();
  }

  // get(name: string): Promise<Data> {
  //   return this.httpClient.get<Data>(environment.backendUrl + '/data/' + name).toPromise();
  // }
  //
  //
  // update(data: Data) {
  //   return this.httpClient.put(environment.backendUrl + '/data/' + data.name, data).toPromise();
  // }
  //
  // delete(name: string): Promise<void> {
  //   return this.httpClient.delete<void>(environment.backendUrl + '/data/' + name).toPromise();
  // }
}
