import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { HomeService } from './../../services/Home/home.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  [x: string]: any;

  createClassForm = new FormGroup({
    classname: new FormControl(),
    subject: new FormControl(),
    section: new FormControl()
  })
  joinClassForm = new FormGroup({
    roomCode: new FormControl()
  })

  loading: boolean = true;
  classes: any = []
  creatingClass = '';
  joiningClass = '';
  failedInClassService = '';
  constructor(private homeService: HomeService, private router: Router, private location: Location) {
    this.router.events.subscribe(() => {
      if (location.path() === '' && document.querySelector('.sidebar')) {
        let body: HTMLElement = document.querySelector('body');
        body.classList.remove('pushable')
        let elem: HTMLElement = document.querySelector('.sidebar');
        elem.classList.remove('visible')
      }
    })
  }


  ngOnInit(): void {
    this.user = JSON.parse(atob(localStorage.getItem('lu-user')));
    this.username = `${this.user.firstname} ${this.user.lastname}`
    this.userphoto = this.user['photo'];

    this.homeService
      .getProfile(this.user._id, this.user.profession)
      .subscribe((res) => {
        let user = res;
        this.loading = false;
        if (user['allClass']) {
          for (let i = 0; i < user['allClass'].length; i++) {
            this.classes.push(user['allClass'][i])
          }
        }
      }, err => { console.log(err) })
  }

  createClass() {

    this.creatingClass = 'creatingClasss';
    this.createClassForm.value.author_name = `${this.user.firstname} ${this.user.lastname}`;
    this.createClassForm.value.author_id = `${this.user._id}`;

    this.homeService
      .createClass(this.createClassForm.value)
      .subscribe((res) => {
        console.log(res)
        this.classes.push(res)
        this.creatingClass = 'createdClass';

        setTimeout(() => {
          this.creatingClass = ''
        }, 2000)

      }, err => {
        console.log(err);
        this.failedInClassService = 'Something went wrong while creating the class.';
        setTimeout(() => {
          this.failedInClassService = ''
        }, 2000);
      })
    // this.createClassForm.reset();
  }
  joinClass() {
    this.joiningClass = 'joiningClass';
    console.log(this.joinClassForm.value, this.user._id)
    this.homeService.joinClass(this.joinClassForm.value, this.user._id).subscribe(res => {
      if (res['success'] != false) {
        console.log(res, "CLASS RESPONSE")
        this.joiningClass = 'joinedToClass';
        setTimeout(() => {
          this.joiningClass = ''
          this.classes.push(res['class'])

        }, 2000)
      } else {
        this.joiningClass = ''
        this.failedInClassService = res['message'];
        setTimeout(() => {
          this.failedInClassService = ''
        }, 2000)
      }

    }, err => {
      console.log(err)
      this.joiningClass = ''

      this.failedInClassService = 'Something went wrong while joining you to the class. Please check the room ID';
      setTimeout(() => {
        this.failedInClassService = ''
      }, 2000);
    })
  }

  deleteClass(classId) {
    this.homeService.deleteClass(classId, this.user._id, this.user.profession).subscribe(res => {
      console.log("DELETED")
    }, (err: Response) => {
      console.log(err)
    })
  }
}
