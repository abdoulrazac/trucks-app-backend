import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function matchFields(
  controlName: string,
  checkControlName: string
): ValidatorFn {
  return (controls: AbstractControl): ValidationErrors | null => {
    const control = controls.get(controlName);
    const checkControl = controls.get(checkControlName);

    if (!control || !checkControl) {
      return null;
    }
    return control.value === checkControl.value ? null : { matching: true };
  };
}
