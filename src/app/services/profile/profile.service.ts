import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }


  getProfile(id) {
    console.log(id, "ID")
    return this.http.get(`http://localhost:5000/profile/${id}`)
  }
  updateUser(id, formVal) {
    return this.http.patch<any>(`http://localhost:5000/profile/${id}`, formVal)
  }

  updatePassword(id, formVal) {
    return this.http.patch(`http://localhost:5000/profile/update-password/${id}`, formVal)
  }
}
