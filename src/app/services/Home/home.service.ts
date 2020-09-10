import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  baseUrl = "https://lu-classroom.herokuapp.com";
  constructor(private http: HttpClient) { }

  getProfile(userId: any, profession: any) {
    return this.http.get(`http://localhost:5000/home/${userId}?profession=${profession}`)
  }
  getClasses(userId: any) {
    return this.http.get(`http://localhost:5000/home/${userId}`)
  }
  createClass(classInfo: any) {
    return this.http.post('http://localhost:5000/home', classInfo)
  }
  joinClass(code: any, _id: any) {
    return this.http.post('http://localhost:5000/home', { roomcode: code.roomCode, _id })
  }
  deleteClass(classId: string, _id: string, profession: string) {
    return this.http.delete(`http://localhost:5000/delete-class/${classId}?profession=${profession}&user=${_id}`)
  }
}
