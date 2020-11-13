import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {

  customValidation = (): ValidatorFn => {
    return (control: AbstractControl) : {[key: string]: any} | null => {
      // below is the regex password validation, 
      // checks for at least one letter, one number and one special character 
      // and at least 3 characters
      // 2 exclamation marks are used to ensure the expression always returns a boolean
      const valid = !!control.value.match(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%* #+=\(\)\^?&])[A-Za-z\d$@$!%* #+=\(\)\^?&]{3,}$/
      )
      return valid ? null : {passwordValidation: { value: control.value }}
    }
  };

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      this.customValidation()
    ]),
  });

  // The get keyword will bind an object property to a function.
  // When this property is looked up, the getter function is called.
  // The return value of the getter function then determines which property is returned.
  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  constructor() {}

  ngOnInit(): void {
    console.warn()
  }


  onSubmit = () => {
      console.warn(this.form.value);
  };
}


// how I would usually do validation but can't as this doesn't change the valid property of the form control element and so styling cant be controlled.
// check above to see adding custom validator function to the FormControl and hence changing the valid property/attribute of elements

// customValidation = (): boolean => {
//   let valid: boolean = false
//   const password: string = this.form.value.password
//   // two !! exclamation points are for the function to always return boolean then an extra one to check if its false
//   if (
//     !!!password.match(
//       /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%* #+=\(\)\^?&])[A-Za-z\d$@$!%* #+=\(\)\^?&]{3,}$/
//     )
//   ) {
//     valid = false
//   }
//   return valid;
// }

// onSubmit = () => {
//   if (this.customValidation()) {
//     console.warn(this.form.value);
//   }
//   return;
// };


