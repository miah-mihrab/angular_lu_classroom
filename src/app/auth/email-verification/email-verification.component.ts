import { AuthService } from './../../services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent implements OnInit {

  constructor(private aRoute: ActivatedRoute, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.aRoute.params.subscribe(param => {
      console.log("ANOTHER")
      console.log(param.token);

      this.authService
        .verifyEmail(param.token)
        .subscribe(res => {
          console.log(res)
          if (res['email'] === 'verified') {
            alert("Email Verified")
            this.router.navigate(['../user/signin'])
          } else {
            alert("Something went wrong in verification. Please try later");
            this.router.navigate(['../user/signin'])
          }
        }, (err: Response) => {
          console.log(err)
          alert("Something went wrong in verification. Please try later");
          this.router.navigate(['../user/signin'])
        })
    })
  }

}
