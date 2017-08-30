import { Directive, forwardRef, Attribute } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[validateNotEqual][formControlName],[validateNotEqual][formControl],[validateNotEqual][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => NotEqualValidator), multi: true }
  ]
})
export class NotEqualValidator implements Validator {
  constructor(
    @Attribute('validateNotEqual') public validateNotEqual: string
  ) {
  }

  validate(c: AbstractControl): { [key: string]: any } {
    const v = c.value;
    const t = c.root.get(this.validateNotEqual).value;

    if (t && v === t) {
      return {
        validateNotEqual: false
      };
    }

    return null;
  }
}
