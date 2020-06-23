import { programCodes } from './../../utils/ProgramCodes';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth/auth.service';
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
  programNames;
  errorMessage = ''
  signupStatus = '';
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
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

  ngOnInit(): void {
    this.programNames = Object.keys(programCodes);
  }

  registerNewAccount() {
    this.signupStatus = 'registeringAccount';
    // console.log(this.signupForm.value)
    this.authService.signup(this.signupForm.value)
      .subscribe(res => {
        let user = btoa(JSON.stringify(res))
        // console.log(res, "SIGN IN");
        localStorage.setItem('lu-user', user);
        this.signupStatus = 'accountRegistered';
        setTimeout(() => {
          this.signupStatus = '';
          this.router.navigate([''])
        }, 1000)


      }, (err: Response) => {
        this.signupStatus = ''
        // console.log(err)
        if (err['error'].message === 'Duplicate key entered') {
          this.errorMessage = 'Email already in use'
        } else {
          this.errorMessage = "Something went wrong while registering.";
        }
        setTimeout(() => {
          this.errorMessage = ''
        }, 2000)

      })
  }


  showPass(id) {
    console.log(id, 'di')
    let dom: HTMLInputElement = document.querySelector(`#${id}`);
    console.log(dom.type)

    if (dom.type === 'password') {
      dom.type = 'text'
    } else {
      dom.type = 'password'
    }
    console.log(dom.type)
  }
}
