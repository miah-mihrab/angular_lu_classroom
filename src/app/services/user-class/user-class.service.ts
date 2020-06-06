import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserClassService {

  constructor(private http: HttpClient) { }

  getClass(id) {
    return this.http.get(`http://localhost:5000/classroom/${id}`);
  }
  createClassPost(post) {
    return this.http.post(`http://localhost:5000/classroom/${post.class}`, post)
  }

  updatePostWithComment(comment) {
    return this.http.patch(`http://localhost:5000/classroom/${comment.postID}`, comment)
  }

  createClasswork(classwork, classroomId) {
    console.log(classroomId)
    return this.http.post(`http://localhost:5000/classroom/${classroomId}/classwork`, classwork)
  }
  getClassworks(classroomId) {
    return this.http.get(`http://localhost:5000/classroom/${classroomId}/classwork`)
  }

  deleteAssignemnt(id) {
    return this.http.delete(`http://localhost:5000/classroom/${id}/classwork`);
  }

  // STUDENT
  submitAssignment(assignment, classroomId) {
    return this.http.post(`http://localhost:5000/classroom/${classroomId}/classwork`, assignment)
  }

}
