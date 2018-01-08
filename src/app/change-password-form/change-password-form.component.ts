import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { PasswordValidators } from './password.validators';

@Component({
  selector: 'change-password-form',
  templateUrl: './change-password-form.component.html',
  styleUrls: ['./change-password-form.component.css']
})
export class ChangePasswordFormComponent {
  form: FormGroup;
  // form = new FormGroup({
  //   oldPassword: new FormControl('', Validators.required),
  //   newPassword: new FormControl('', Validators.required),
  //   confirmPassword: new FormControl('', Validators.required)    
  // });

  constructor(fb: FormBuilder){
    this.form = fb.group({
      oldPassword: [
        '', 
        Validators.required, 
        PasswordValidators.incorrectOldPassword
      ],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    }, {
      validator: PasswordValidators.passwordsDontMatch
    });
  }

  get oldPassword(){
    return this.form.get('oldPassword');
  }
  get newPassword(){
    return this.form.get('newPassword');
  }
  get confirmPassword(){
    return this.form.get('confirmPassword');
  }
}
