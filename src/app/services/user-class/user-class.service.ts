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
    return this.http.post(`https://lu-classroom.herokuapp.com/classroom/${post.get('class')}`, post)
  }

  updatePostWithComment(comment) {
    return this.http.patch(`https://lu-classroom.herokuapp.com/classroom/${comment.get('postID')}`, comment)
  }

  createClasswork(classwork, classroomId) {
    console.log(classwork, classroomId)
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
    return this.http.post(`http://localhost:5000/classroom/${classroomId}/classwork`, assignment)
  }

}
