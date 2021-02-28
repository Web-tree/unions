import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {ApiKeysPair} from '@webtree/unions-common/lib/api-keys-pair';

@Injectable({
  providedIn: 'root'
})
export class KeysService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  create(unionId: string): Promise<ApiKeysPair> {
    return this.httpClient.post<ApiKeysPair>(`${environment.back.url}/${unionId}/generateApiKeys`, null).toPromise();
  }

  get(unionId: string): Promise<ApiKeysPair[]> {
    return this.httpClient.get<ApiKeysPair[]>(`${environment.back.url}/${unionId}/getApiKeys`).toPromise();
  }
}
