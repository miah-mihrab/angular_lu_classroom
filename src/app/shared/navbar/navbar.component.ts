import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() username;
  @Input() userphoto;
  user: string;

  constructor() { }

  ngOnInit(): void {
    this.user = JSON.parse(atob(localStorage.getItem('lu-user')));
    console.log(this.user['profession'])
  }

}
