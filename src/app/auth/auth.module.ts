import { SharedModule } from './../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPassComponent } from './reset-pass/reset-pass.component';
import { EmailVerificationComponent } from './email-verification/email-verification.component';


@NgModule({
  declarations: [SignInComponent, SignUpComponent, ForgotPasswordComponent, ResetPassComponent, EmailVerificationComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule
  ]
})
export class AuthModule { }
