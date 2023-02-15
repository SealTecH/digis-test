import { ValidationErrors, AbstractControl } from '@angular/forms';
import { isNil } from 'lodash-es';

export function lessThanValueValidator(control: AbstractControl<number>, valueToCompare: number | null, errMsg: string): ValidationErrors | null {
  if(!control || isNil(valueToCompare)){
    return  null;
  }
  return  control.value < valueToCompare ? null : { mustBeLessThan: errMsg }
}
