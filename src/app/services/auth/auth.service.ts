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
}
