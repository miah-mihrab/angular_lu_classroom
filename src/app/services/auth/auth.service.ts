import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signIn(credentials) {
    return this.http.post('http://localhost:5000/signin', credentials)
  }
  signup(infos) {
    return this.http.post('http://localhost:5000/registration', infos)
  }
}
