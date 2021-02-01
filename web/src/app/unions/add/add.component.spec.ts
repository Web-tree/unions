import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {AddComponent} from './add.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Location} from '@angular/common';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {UnionsService} from '../../_services/unions.service';
import {By} from '@angular/platform-browser';
import {AlertService} from '../../_services/alert.service';
import {RouterTestingModule} from '@angular/router/testing';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';

describe('AddComponent', () => {
  let component: AddComponent;
  let fixture: ComponentFixture<AddComponent>;
  let dataService: UnionsService;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        AddComponent,
      ],
      imports: [
        NoopAnimationsModule,
        MatIconModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        RouterTestingModule
      ],
      providers: [
        {provide: Location, useValue: jasmine.createSpyObj('Location', ['back'])},
        {provide: UnionsService, useValue: jasmine.createSpyObj('DataService', ['add', 'get'])},
        {provide: AlertService, useValue: jasmine.createSpyObj('AlertService', ['success'])},

      ]
    })
      .compileComponents();
    dataService = TestBed.inject(UnionsService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call add method on form submit', () => {
    // dataService.get = jasmine.createSpy().and.returnValue(Promise.reject()); // passing uniq validator

    component.form.controls.id.setValue('someId');
    component.form.controls.displayName.setValue('someName');

    fixture.debugElement.query(By.css('form')).triggerEventHandler('ngSubmit', null);

    fixture.detectChanges();

    expect(dataService.add).toHaveBeenCalledWith({id: 'someId', displayName: 'someName'});
  });
});
