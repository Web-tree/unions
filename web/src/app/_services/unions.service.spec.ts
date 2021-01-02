import {TestBed} from '@angular/core/testing';

import {UnionsService} from './unions.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {environment} from '../../environments/environment';
import {Union} from '../../../../common/src/model/union';

describe('DataService', () => {
  let httpMock: HttpTestingController;
  let service: UnionsService;

  beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          HttpClientTestingModule
        ]
      });
      httpMock = TestBed.inject(HttpTestingController);
      service = TestBed.inject(UnionsService);
    }
  );

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  // describe('list', () => {
  //   it('should call backend', () => {
  //     service.getList();
  //
  //     const req = httpMock.expectOne(environment.backendUrl + '/data');
  //     expect(req.request.method).toEqual('GET');
  //   });
  //
  //   it('should return data from backend response', () => {
  //     const listPromise: Promise<Union[]> = service.getList();
  //
  //     listPromise.then(dataList => {
  //       expect(dataList.length).toEqual(2);
  //       expect(dataList[0].name).toEqual('name1');
  //       expect(dataList[0].value).toEqual('value1');
  //       expect(dataList[1].name).toEqual('name2');
  //       expect(dataList[1].value).toEqual('value2');
  //     });
  //
  //     httpMock.expectOne(environment.backendUrl + '/data').flush([
  //       {name: 'name1', value: 'value1'},
  //       {name: 'name2', value: 'value2'}
  //     ]);
  //   });
  // });

  describe('add', () => {
    it('should call backend', () => {
      const data: Union = {id: 'anId', displayName: 'aName'};
      service.add(data).then();

      const req = httpMock.expectOne(environment.back.create);
      expect(req.request.method).toEqual('PUT');
      expect(req.request.body).toEqual(data);
    });
  });
  // describe('get', () => {
  //   it('should call backend', () => {
  //     service.get('aName').then();
  //
  //     const req = httpMock.expectOne(environment.backendUrl + '/data/aName');
  //     expect(req.request.method).toEqual('GET');
  //   });
  //
  //   it('should return promise with data from backend', () => {
  //     const sentData = {name: 'aName', value: 'aValue', type: 'other'};
  //     service.get('aName').then(data => {
  //       expect(data).toEqual(sentData);
  //     });
  //
  //     httpMock.expectOne(environment.backendUrl + '/data/aName').flush(sentData);
  //   });
  // });
  // xdescribe('isExists', () => {
  //   it('should return false when data not exists', async () => {
  //     const promise = service.isExists('not-existing-name').then();
  //
  //     httpMock.expectOne(environment.backendUrl + '/data/not-existing-name').flush({}, {status: 404});
  //     expect(await promise).toBeFalsy();
  //   });
  // });
  // describe('update', () => {
  //   it('should call backend method', () => {
  //     const data = {name: 'aName', value: 'aValue', type: 'other'};
  //     service.update(data).then();
  //
  //     const req = httpMock.expectOne(environment.backendUrl + '/data/aName');
  //     expect(req.request.method).toEqual('PUT');
  //     expect(req.request.body).toEqual(data);
  //   });
  // });
  // describe('delete', () => {
  //   it('should call backend method', () => {
  //     service.delete('some-name').then();
  //
  //     const req = httpMock.expectOne(environment.backendUrl + '/data/some-name');
  //     expect(req.request.method).toEqual('DELETE');
  //     expect(req.request.body).toBeFalsy();
  //   });
  // });
});
