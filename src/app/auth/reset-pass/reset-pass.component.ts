import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './../../services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PasswordMatching } from 'src/app/validators/password-matching.validators';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.css']
})
export class ResetPassComponent implements OnInit {
  tokenValid: boolean;
  resetPassword: FormGroup
  token: any;
  responseMessage: string = '';
  errorMessage: string = '';
  email: any;

  constructor(
    private aRoute: ActivatedRoute,
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.aRoute.params.subscribe(param => {
      this.token = param.token;
      console.log(this.token)
      this.authService.resetTokenValidation(param.token).subscribe(res => {

        console.log(res['status'])
        if (res['status'] === 'valid') {
          this.tokenValid = true;
          this.email = res['email'];
        } else {
          this.tokenValid = false;
        }
      }, (err) => {
        console.log(err)
        this.tokenValid = false;

      })
    });


    this.resetPassword = this.fb.group({
      password: ['', [
        Validators.required,
        Validators.pattern(new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"))
      ]],
      confirm_password: ['', [
        Validators.required
      ]],
    }, {
      validator: PasswordMatching.passwordShouldMatch
    })
  }
  showPass(id) {
    let dom: HTMLInputElement = document.querySelector(`#${id}`);
    console.log(dom.type)

    if (dom.type === 'password') {
      dom.type = 'text'
    } else {
      dom.type = 'password'
    }
    console.log(dom.type)
  }


  resetPassFunc() {
    this.authService.resetPassword(this.resetPassword.value.password, this.email).subscribe(res => {
      if (res['status'] === 'success') {
        this.responseMessage = 'passChanged';
        console.log(this.responseMessage)
        setTimeout(() => {
          this.responseMessage = '';
        }, 2000)
      } else {
        this.errorMessage = 'Something went wrong. Try again later';
        setTimeout(() => {
          this.errorMessage = '';
        }, 2000)
      }
      setTimeout(() => {
        this.router.navigate(['/user/signin']);
      }, 2000);
    }, err => {
      this.errorMessage = 'Something went wrong';
      setTimeout(() => {

        this.errorMessage = '';
        this.router.navigate(['/user/signin']);
      }, 2000)
    })
  }
}
