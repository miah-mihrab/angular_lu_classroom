import { programCodes } from './../../utils/ProgramCodes';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProfileService } from './../../services/profile/profile.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  programNames;
  userForm: FormGroup;
  passwordForm = new FormGroup({
    old_password: new FormControl('', [
      Validators.required
    ]),
    new_password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.pattern(new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"))
    ]
    ),
    confirm_password: new FormControl('', [
      Validators.required
    ])
  })
  loading: boolean = true;
  id;
  user: any;
  updating: boolean = false;
  updatingPass: boolean = false;
  file: any;
  updateMessage: string = '';
  updateErrorMessage: string = '';
  courses = [];
  showResult: boolean = false;
  student = [];
  department: any;

  constructor(
    private profileService: ProfileService,
    private aRoute: ActivatedRoute,
    private location: Location,
    private router: Router) {
    this.router.events.subscribe(() => {
      if (this.location.path().includes('result') || this.location.path().includes('routine')) {
        this.showResult = true;
      } else {
        this.showResult = false;
      }
    })
  }

  ngOnInit(): void {
    this.programNames = Object.keys(programCodes);
    this.user = JSON.parse(atob(localStorage.getItem('lu-user')))
    this.aRoute.params.subscribe(param => {
      this.id = param.id;
      this.profileService.getProfile(this.id).subscribe(res => {
        this.userForm = new FormGroup({
          firstname: new FormControl(res['firstname']),
          lastname: new FormControl(res['lastname']),
          email: new FormControl(res['email']),
          id: new FormControl(res['id']),
          batch: new FormControl(res['batch']),
          section: new FormControl(res['section']),
          department: new FormControl(res['department'], [
            Validators.required
          ]),
          dob: new FormControl(res['dob'] ? res['dob'].split('/').join('-') : ''),
          semester: new FormControl(res['semester']),
          userphoto: new FormControl(res['userPhoto']),
        })

        this.department = this.userForm['department']
        this.loading = false
        this.userForm.disable();
        this.passwordForm.disable();

      }, err => {
        console.log(err)
      })
    })
  }


  imageChange(event) {
    this.file = event.target.files[0]

  }

  updateUser() {
    this.updating = true;
    let user = this.userForm.value;
    user.file = this.file

    let formData = new FormData();

    formData.append('firstname', user.firstname);
    formData.append('lastname', user.lastname);
    formData.append('email', user.email);
    formData.append('id', user.id);
    formData.append('_id', this.user._id);
    formData.append('userPhoto', user.userphoto);
    formData.append('batch', user.batch);
    formData.append('section', user.section);
    formData.append('semester', user.semester);
    formData.append('dob', user.dob);
    formData.append('department', user.department);
    if (this.file) {
      delete user.userphoto
      formData.append('photo', this.file);
    }
    this.profileService.updateUser(this.id, formData).subscribe(res => {
      this.updating = false;
      if (res.success === true) {
        let obj = Object.assign({}, res.user);
        let user = btoa(JSON.stringify(obj));
        localStorage.setItem('lu-user', user);
        this.updateMessage = "Profile Updated";
        this.updating = false;
        document.querySelectorAll('button').forEach(e => {
          e.disabled = false;
        })
        setTimeout(() => {
          this.updateMessage = ''

        }, 2000)
      } else {
        this.updateErrorMessage = "Something went wrong please try again later"
        setTimeout(() => {
          this.updateErrorMessage = ''

        }, 2000)
      }
    }, err => {
      console.log(err)
    })
  }

  toggleSideBar() {
    $('.ui.sidebar')
      .sidebar('toggle')
      ;

  }



  updatePassword() {
    this.updatingPass = !this.updatingPass
    this.profileService.updatePassword(this.id, this.passwordForm.value).subscribe(res => {
      if (res['error']) {
        this.updateErrorMessage = res['error']
        setTimeout(() => {
          this.updateErrorMessage = ''
        }, 2000)
      }
      this.updateMessage = "Password Updated"
      setTimeout(() => {
        this.updateMessage = ''
      }, 2000)
      this.updatingPass = !this.updatingPass
    }, (err: Response) => {
      this.updateErrorMessage = err['message'];
      setTimeout(() => {
        this.updateErrorMessage = ''
      }, 2000)
    })
  }


  showPass(id) {
    let dom: HTMLInputElement = document.querySelector(`#${id}`);

    if (dom.type === 'password') {
      dom.type = 'text'
    } else {
      dom.type = 'password'
    }
  }



  openNav() {
    // document.getElementById('openbtn').style.visibility = "hidden"
    if (document.getElementById("mySidebar").style.width != '250px') {
      document.getElementById("mySidebar").style.width = "250px";
      document.getElementById("main").style.marginLeft = "250px";
    }
    else {
      this.closeNav();
    }
  }

  closeNav() {
    // document.getElementById('openbtn').style.visibility = "visible"
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  }

  enableInputs() {
    let elem: HTMLInputElement = document.querySelector('input[type=file]');
    if (this.userForm.enabled) {
      this.userForm.disable();
      this.passwordForm.disable();
      elem.disabled = true;
    } else {
      this.userForm.enable();
      this.passwordForm.enable();

      elem.disabled = false;
    }

  }
}
