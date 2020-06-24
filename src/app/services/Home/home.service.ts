import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  getProfile(userId: any, profession: any) {
    return this.http.get(`https://lu-classroom.herokuapp.com/home/${userId}?profession=${profession}`)
  }
  getClasses(userId: any) {
    return this.http.get(`https://lu-classroom.herokuapp.com/home/${userId}`)
  }
  createClass(classInfo: any) {
    return this.http.post('https://lu-classroom.herokuapp.com/home', classInfo)
  }
  joinClass(code: any, _id: any) {
    return this.http.post('https://lu-classroom.herokuapp.com/home', { roomcode: code.roomCode, _id })
  }
  deleteClass(classId: string, _id: string, profession: string) {
    return this.http.delete(`https://lu-classroom.herokuapp.com/delete-class/${classId}?profession=${profession}&user=${_id}`)
  }
}
