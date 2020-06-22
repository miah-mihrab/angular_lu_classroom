import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserClassService {

  constructor(private http: HttpClient) { }

  getClass(id) {
    return this.http.get(`https://lu-classroom.herokuapp.com/classroom/${id}`);
  }
  createClassPost(post) {
    console.log(post)
    return this.http.post(`https://lu-classroom.herokuapp.com/classroom/${post.get('class')}`, post)
  }

  updatePostWithComment(comment) {
    return this.http.patch(`https://lu-classroom.herokuapp.com/classroom/${comment.get('postID')}`, comment)
  }

  createClasswork(classwork, classroomId) {
    console.log(classroomId)
    return this.http.post(`https://lu-classroom.herokuapp.com/classroom/${classroomId}/classwork`, classwork)
  }
  getClassworks(classroomId) {
    return this.http.get(`https://lu-classroom.herokuapp.com/classroom/${classroomId}/classwork`)
  }

  deleteAssignemnt(id) {
    return this.http.delete(`https://lu-classroom.herokuapp.com/classroom/${id}/classwork`);
  }

  // STUDENT
  submitAssignment(assignment, classroomId) {
    return this.http.post(`https://lu-classroom.herokuapp.com/classroom/${classroomId}/classwork`, assignment)
  }

}
