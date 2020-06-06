import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { PasswordMatching } from 'src/app/validators/password-matching.validators';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {


  signupForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.signupForm = this.fb.group({

      firstname: ['', [Validators.required]],
      lastname: ['', [
        Validators.required
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.pattern(new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"))
      ]],
      confirm_password: ['', [
        Validators.required
      ]],
      id: ['', [
        Validators.required,
        Validators.pattern('[0-9]+')
      ]],
      department: ['', [
        Validators.required
      ]],
      profession: ['', [
        Validators.required
      ]]
    }, {
      validator: PasswordMatching.passwordShouldMatch
    })
  }

  ngOnInit(): void { }

  registerNewAccount() {
    console.log(this.signupForm.value)
  }

}
