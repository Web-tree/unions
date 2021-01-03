import {TestBed} from '@angular/core/testing';
import {AlertService} from './alert.service';
import {RouterTestingModule} from '@angular/router/testing';


describe('Alert Service', () => {

  let alertService: AlertService;
  const msg = 'testMessage';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AlertService,
      ],
      imports: [
        RouterTestingModule.withRoutes([]),
      ]
    });
    // snackBar = jasmine.createSpyObj('MatSnackBar', ['open']);
    alertService = new AlertService();
  });
  //
  xit('should open snack bar on success message', () => {
    const message = 'someMessage';
    alertService.success(message);
    // expect(snackBar.open).toHaveBeenCalledWith(message, 'X', {duration: 5000});
  });
  xit('should open snack bar on error message', () => {
    const message = 'someMessage';
    alertService.success(message);
    // expect(snackBar.open).toHaveBeenCalledWith(message, 'X', {duration: 5000});
  });
});
