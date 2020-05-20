import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  getProfile(userId, profession) {
    return this.http.get(`http://localhost:5000/home/5e4d300fc29b819d20340984?profession=Teacher`)
  }
  getClasses(userId) {
    return this.http.get(`http://localhost:5000/home/${userId}`)
  }
  createClass(classInfo) {
    return this.http.post('http://localhost:5000/home', classInfo)
  }
}
