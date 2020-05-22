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

  classes: any = []

  constructor(private homeService: HomeService, private router: Router) { }


  ngOnInit(): void {
    this.user = JSON.parse(atob(localStorage.getItem('lu-user')));
    this.username = `${this.user.firstname} ${this.user.lastname}`
    this.userphoto = this.user['photo'];

    this.homeService
      .getProfile(this.user._id, this.user.profession)
      .subscribe((res) => {
        let user = res;
        if (user['allClass']) {
          for (let i = 0; i < user['allClass'].length; i++) {
            this.classes.push(user['allClass'][i])
          }
        }
      }, err => { console.log(err) })
  }

  createClass() {

    this.createClassForm.value.author_name = `${this.user.firstname} ${this.user.lastname}`;
    this.createClassForm.value.author_id = `${this.user._id}`;

    this.homeService
      .createClass(this.createClassForm.value)
      .subscribe((res) => {
        this.classes.push(res)
      }, err => {
        console.log(err);
      })
    // this.createClassForm.reset();
  }
  joinClass() {
    console.log(this.joinClassForm.value, this.user._id)
    this.homeService.joinClass(this.joinClassForm.value, this.user._id).subscribe(res => {
      console.log(res)
      this.router.navigate(['./'])
    }, err => {
      console.log(err)
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
