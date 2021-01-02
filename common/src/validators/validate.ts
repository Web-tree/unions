import { ValidationError } from 'class-validator';

export function isValidationError(e: any): e is ValidationError[] {
  if (Array.isArray(e)) {
    e = e[0];
  } else {
    return false;
  }
  // console.log(e.property, e.target, e.value, e);
  return e instanceof ValidationError || (e.property && (e.target || e.value));
}
