// import * as functions from 'firebase-functions';
import {AbstractControl, AsyncValidatorFn, ValidationErrors} from '@angular/forms';
import {Observable} from 'rxjs';
import {isNotFoundError} from '../_helpers/http-response.helper';
import {UnionsService} from '../_services/unions.service';
import {ValidationError} from 'class-validator';

export function isNameExists(dataService: UnionsService): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return dataService.get(control.value).then(() => {
      return {nameExists: true};
    }).catch(error => {
      return isNotFoundError(error) ? null : error;
    });
  };
}
