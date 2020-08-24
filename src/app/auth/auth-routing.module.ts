import { EmailVerificationComponent } from './email-verification/email-verification.component';
import { ResetPassComponent } from './reset-pass/reset-pass.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'signin', component: SignInComponent
  },
  {
    path: 'signup', component: SignUpComponent
  },
  {
    path: 'forgot-password', component: ForgotPasswordComponent
  },
  {
    path: 'reset-password/:token', component: ResetPassComponent
  },
  {
    path: 'verification/:token', component: EmailVerificationComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
