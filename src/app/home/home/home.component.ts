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


  //     {
  //   classname: 'Introduction To Computer',
  //     students: [{ name: "something" }],
  //       author_name: 'Example',
  //         section: '42nd',
  //           _id: '001'
  // }
  classes: any = []

  constructor(private homeService: HomeService) { }


  ngOnInit(): void {
    this.user = JSON.parse(atob(localStorage.getItem('lu-user')));
    this.homeService.getProfile(this.user._id, this.user.profession).subscribe((res) => {

      let user = res;
      console.log(user)
      this.username = `${this.user.firstname} ${this.user.lastname}`
      this.userphoto = user['userPhoto'];
      localStorage.setItem('lu-user__photo', this.userphoto);


      for (let i = 0; i < user['allClass'].length; i++) {
        this.classes.push(user['allClass'][i])
      }

      console.log(this.classes)
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
}
