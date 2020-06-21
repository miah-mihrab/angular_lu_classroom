import { Router } from '@angular/router';
import { AuthService } from './../../services/auth/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  error = '';

  credentials = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required

    ]),
  })
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void { }


  signIn() {
    this.authService
      .signIn(this.credentials.value)
      .subscribe((res) => {
        let user = btoa(JSON.stringify(res))
        console.log(res, "SIGN IN")
        localStorage.setItem('lu-user', user)
        this.router.navigate([''])
      }, err => {
        this.error = err.error.message;
        setTimeout(() => {
          this.error = ''
        }, 2000)
      })
  }

}
