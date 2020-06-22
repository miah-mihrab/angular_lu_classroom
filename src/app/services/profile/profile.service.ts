import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }


  getProfile(id) {
    return this.http.get(`https://lu-classroom.herokuapp.com/profile/${id}`)
  }
  updateUser(id, formVal) {
    return this.http.patch<any>(`https://lu-classroom.herokuapp.com/profile/${id}`, formVal)
  }

  updatePassword(id, formVal) {
    return this.http.patch(`https://lu-classroom.herokuapp.com/profile/update-password/${id}`, formVal)
  }
}
