import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Union} from '@webtree/unions-common/lib/model/union';

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

  my(): Promise<Union[]> {
    return this.httpClient.get<Union[]>(environment.back.url + '/').toPromise();
  }

  add(union: Union): Promise<any> {
    return this.httpClient.put(environment.back.url, union).toPromise();
  }

  get(id: string): Promise<Union> {
    return this.httpClient.get<Union>(environment.back.url + '/' + id).toPromise();
  }
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
