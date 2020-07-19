import { AuthService } from './../../services/auth/auth.service';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgot = new FormGroup({
    email: new FormControl()
  })
  responseMessage: string;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  forgotPassword() {
    let form = this.forgot;
    console.log(form.value.email)
    this.responseMessage = 'If we find your email in our database. You will receive an email to reset';
    this.authService.forgotPassword(form.value.email).subscribe();
  }
}
