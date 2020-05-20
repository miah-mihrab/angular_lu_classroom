import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { Router, ActivatedRoute } from '@angular/router';
import { UserClassService } from 'src/app/services/user-class/user-class.service';
import { PostType } from '../../utils/ClassPostType'
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
    this.userphoto = localStorage.getItem('lu-user__photo');

    console.log(this.user)
    this.aRoute.params.subscribe(param => {
      this.id = param.id
      this.classService.getClass(this.id).subscribe(res => {
        console.log(res)
        localStorage.setItem('lu_current_classroom', res['classID'])
        this.classContent = res;
        this.classPosts = this.classContent.ClassPosts;

      }, (err: Response) => {
        console.log(err);
      })
    })
  }


  createPost() {
    let post = {
      content: this.post,
      class: this.id,
      author: this.user.firstname + " " + this.user.lastname,
      photo: this.userphoto
    }
    this.classService.createClassPost(post).subscribe((res: any) => {
      this.classPosts.push(res)
    }, err => {
      console.log(err);
    })
  }

  postComment(postID) {
    console.log(this.comment)
    let comment = {
      postID,
      comment: this.comment,
      author: this.user.firstname + " " + this.user.lastname,
      photo: this.userphoto
    }
    this.classService.updatePostWithComment(comment).subscribe(res => {
      let post = this.classPosts.filter(pst => pst['_id'] === postID)
      post[0]['comments'].push(res['comments'][res['comments'].length - 1])
    }, err => {
      console.log(err);
    })
  }
}
