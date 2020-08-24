import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  baseUrl = "https://lu-classroom.herokuapp.com";
  signIn(credentials) {
    return this.http.post('https://lu-classroom.herokuapp.com/signin', credentials)
  }
  signup(infos) {
    return this.http.post('https://lu-classroom.herokuapp.com/registration', infos)
  }

  verifyEmail(token: any) {
    return this.http.post('https://lu-classroom.herokuapp.com/email/verification', { token })
  }
  forgotPassword(email: any) {
    return this.http.post('https://lu-classroom.herokuapp.com/forgot-password', { email })
  }

  resetTokenValidation(token) {
    return this.http.post('https://lu-classroom.herokuapp.com/validate-reset-token', { token });
  }
  resetPassword(password: any, email: any) {
    return this.http.patch('https://lu-classroom.herokuapp.com/reset-password', { password, email })
  }
}
