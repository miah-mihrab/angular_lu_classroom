import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { Router, ActivatedRoute } from '@angular/router';
import { UserClassService } from 'src/app/services/user-class/user-class.service';
import { PostType } from '../../utils/ClassPostType'
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-clasroom',
  templateUrl: './clasroom.component.html',
  styleUrls: ['./clasroom.component.css']
})

export class ClasroomComponent implements OnInit {

  childrenRoute: boolean = false;
  id: any;
  classContent: any;
  classPosts: [PostType];
  post: string;
  user: any;
  userphoto: string;
  comment: any;
  constructor(
    private location: Location,
    private router: Router,
    private aRoute: ActivatedRoute,
    private classService: UserClassService) {
    router.events.subscribe(() => {
      if ((this.location.path().includes('classwork')) || (this.location.path().includes('students'))) {
        this.childrenRoute = true
      } else {
        this.childrenRoute = false;
      }
    })

  }

  ngOnInit(): void {
    this.user = JSON.parse(atob(localStorage.getItem('lu-user')))
    this.userphoto = this.user.photo;
    console.log(this.user)
    this.aRoute.params.subscribe(param => {
      this.id = param.id
      this.classService.getClass(this.id).subscribe(res => {
        console.log(res, "RESULT")
        localStorage.setItem('lu_current_classroom', res['classID'])
        this.classContent = res;
        this.classPosts = this.classContent.ClassPosts;
        this.classPosts.reverse();
        setTimeout(() => {
          let allComments = document.querySelectorAll('.cmnts');

          allComments.forEach(e => {
            console.log('here')
            e.scrollTop = e.scrollHeight - e.clientHeight;
          })

        }, 1000)
      }, (err: Response) => {
        console.log(err);
      })
    })
  }


  createPost(form: NgForm) {

    let formData = new FormData();
    formData.append('content', this.post);
    formData.append('class', this.id);
    formData.append('author', this.user.firstname + " " + this.user.lastname);
    formData.append('userPhoto', this.userphoto);
    this.classService.createClassPost(formData).subscribe((res: any) => {
      this.classPosts.reverse()
      this.classPosts.push(res)
      this.classPosts.reverse();
    }, err => {
      console.log(err);
    })
    form.reset();
  }

  postComment(postID, form: NgForm) {

    let formData = new FormData();
    formData.append('postID', postID);
    formData.append('comment', form.value.comment);
    formData.append('author', this.user.firstname + " " + this.user.lastname);
    formData.append('userPhoto', this.userphoto);
    this.classService.updatePostWithComment(formData).subscribe(res => {
      let post = this.classPosts.filter(pst => pst['_id'] === postID)
      post[0]['comments'].push(res['comments'][res['comments'].length - 1]);

    }, err => {
      console.log(err);
    })
    this.comment = '';

  }
}

