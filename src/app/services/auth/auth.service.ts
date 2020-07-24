import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signIn(credentials) {
    return this.http.post('https://lu-classroom.herokuapp.com/signin', credentials)
  }
  signup(infos) {
    return this.http.post('https://lu-classroom.herokuapp.com/registration', infos)
  }

  forgotPassword(email: any) {
    console.log(email)
    return this.http.post('https://lu-classroom.herokuapp.com/forgot-password', { email })
  }

  resetTokenValidation(token) {
    return this.http.post('https://lu-classroom.herokuapp.com/validate-reset-token', { token });
  }
  resetPassword(password: any, email: any) {
    return this.http.patch('https://lu-classroom.herokuapp.com/reset-password', { password, email })
  }
}
