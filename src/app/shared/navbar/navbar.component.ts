import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private aRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(atob(localStorage.getItem('lu-user')));
  }

  signout() {
    localStorage.removeItem('lu-user');
    localStorage.removeItem('lu_current_classroom');
    localStorage.removeItem('lu-user__photo');
    this.router.navigate(['user/signin']);
  }

}
