import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { HomeService } from './../../services/Home/home.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
declare var $: any;
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
  classDeleteId;
  creatingClass = '';
  joiningClass = '';
  confirmation = '';

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

    this.confirmation = 'creatingClasss';
    this.createClassForm.value.author_name = `${this.user.firstname} ${this.user.lastname}`;
    this.createClassForm.value.author_id = `${this.user._id}`;

    this.homeService
      .createClass(this.createClassForm.value)
      .subscribe((res) => {
        this.classes.push(res)
        this.confirmation = 'createdClass';

        setTimeout(() => {
          this.confirmation = ''
        }, 2000)

      }, err => {
        this.failedInClassService = 'Something went wrong while creating the class.';
        setTimeout(() => {
          this.failedInClassService = ''
        }, 2000);
      })
    // this.createClassForm.reset();
  }
  joinClass() {
    this.confirmation = 'joiningClass';
    this.homeService.joinClass(this.joinClassForm.value, this.user._id).subscribe(res => {
      if (res['success'] != false) {
        this.confirmation = 'joinedToClass';
        setTimeout(() => {
          this.confirmation = ''
          this.classes.push(res['class'])

        }, 2000)
      } else {
        this.confirmation = ''
        this.failedInClassService = res['message'];
        setTimeout(() => {
          this.failedInClassService = ''
        }, 2000)
      }

    }, err => {
      this.confirmation = ''

      this.failedInClassService = 'Something went wrong while joining you to the class. Please check the room ID';
      setTimeout(() => {
        this.failedInClassService = ''
      }, 2000);
    })
  }

  deleteClass(classId) {
    this.classDeleteId = classId;

  }

  confirmDeleteClass(confirmation) {
    if (confirmation) {
      this.homeService.deleteClass(this.classDeleteId, this.user._id, this.user.profession).subscribe(res => {

        for (let i = 0; i < this.classes.length; i++) {
          if (this.classes[i]._id === this.classDeleteId) {
            this.classes.splice(i, 1);
            break;
          }
        }
        this.confirmation = 'classDeleted';

        setTimeout(() => {
          this.confirmation = ''
        }, 2000);


      }, (err: Response) => {
        this.failedInClassService = 'Something went wrong while deleting the class'

        setTimeout(() => {
          this.failedInClassService = ''
        }, 2000)
      })
    }
  }
}
