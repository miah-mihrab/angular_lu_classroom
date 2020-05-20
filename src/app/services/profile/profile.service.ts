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
    this.http.patch<any>(`http://localhost:5000/profile/${id}`, formVal).subscribe(res => {
      console.log(res)
      let user = btoa(JSON.stringify(res.user));
      localStorage.setItem('lu-user', user)
    }, err => {
      console.log(err)
    })
  }
}
