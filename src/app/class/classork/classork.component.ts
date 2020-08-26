import { UserClassService } from 'src/app/services/user-class/user-class.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-classork',
  templateUrl: './classork.component.html',
  styleUrls: ['./classork.component.css']
})
export class ClassorkComponent implements OnInit {
  createClasswork = new FormGroup({
    assignmentname: new FormControl(),
    details: new FormControl()
  });

  submitAssignment = new FormGroup({
    name: new FormControl(),
    description: new FormControl()
  })

  file: any;
  classroomId: any;
  user: any;
  allClassworks = [];
  failedSubmission = '';
  successSubmission = '';
  assignmentSubmitting: boolean = true;
  assignmentSubmittingStatus = '';
  assignmentCreatingStatus = '';
  assignmentCreationFailed = '';
  constructor(private aRoute: ActivatedRoute, private classService: UserClassService) { }

  ngOnInit(): void {
    this.user = JSON.parse(atob(localStorage.getItem('lu-user')))
    this.classroomId = localStorage.getItem('lu_current_classroom')

    this.classService
      .getClassworks(this.classroomId)
      .subscribe(res => {
        let keys = Object.keys(res)
        for (let i = 0; i < res['classWorks'].length; i++) {
          let classwork = res['classWorks'][i]
          this.allClassworks.push({
            assignmentname: classwork.assignmentname,
            description: classwork.details,
            file: classwork.file ? classwork.file[0] : '',
            filename: classwork.fileName ? classwork.fileName : '',
            students: classwork.students,
            submitted: classwork.submitted,
            _id: classwork['_id']
          })
        }

      }, (err: Response) => {
        console.log(err)
      })
  }

  fileUpload(event) {
    this.file = event.target.files[0]
  }

  createNewClasswork() {
    this.assignmentCreatingStatus = 'creatingAssignment'
    let classwork = this.createClasswork.value;
    classwork.file = this.file;
    classwork.author = this.user.firstname + " " + this.user.lastname


    let formData = new FormData();
    formData.append('file', this.file)
    formData.append('author', this.user.firstname + " " + this.user.lastname)
    formData.append('assignmentname', classwork.assignmentname);
    formData.append('details', classwork.details)




    if (this.user.profession === 'Teacher') {
      // classwork.profession = 'Teacher'
      formData.append('profession', 'Teacher')
    } else {
      // classwork.profession = 'Student'
      formData.append('profession', 'Student')
    }
    this.classService
      .createClasswork(formData, this.classroomId)
      .subscribe(res => {
        this.assignmentCreatingStatus = '';
        if (!res['message']) {
          this.assignmentCreatingStatus = 'assignmentCreated'
          this.allClassworks.push({
            assignmentname: res['assignmentname'],
            description: res['details'],
            file: res['file'] ? res['file'][0] : "",
            filename: res['fileName'] ? res['fileName'] : "",
            students: res['students'],
            submitted: res['submitted'],
            _id: res['_id']
          });
          this.createClasswork.reset();
          setTimeout(() => {
            this.assignmentCreatingStatus = ''
          }, 2000)
        } else {

          this.assignmentCreationFailed = res['message'] ? res['message'] : "Something went wrong";

          setTimeout(() => {
            this.assignmentCreationFailed = '';
          }, 2000)
        }
      }, err => {
        this.assignmentCreationFailed = err.error.message ? err.error.message : 'Something went wrong'

        setTimeout(() => {
          this.assignmentCreationFailed = '';
        })
      })
  }


  makeFile(b64Data, name) {
    const linkSource = `data:application/${name};base64,` + b64Data;
    const downloadLink = document.createElement("a");
    const fileName = name;

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();


  }

  assignmentSubmission(form: NgForm, assignmentId) {
    this.assignmentSubmittingStatus = 'assignmentSubmitting';

    let assignment = this.submitAssignment.value;
    let formData = new FormData();

    formData.append('name', this.user.firstname + " " + this.user.lastname)
    formData.append('studentId', this.user.id)
    formData.append('details', assignment.description)
    formData.append('assignmentname', assignment.name)
    formData.append('assignmentId', assignmentId)
    formData.append('userId', this.user._id)
    formData.append('file', this.file);


    this.classService
      .submitAssignment(formData, this.classroomId)
      .subscribe(res => {
        if (res['error']) {
          this.assignmentSubmittingStatus = 'alreadySubmited';
        } else {
          this.assignmentSubmittingStatus = 'assignmentSubmitted';
        }
        setTimeout(() => {
          this.assignmentSubmittingStatus = ''
        }, 2000);
      }, (err: Response) => {
        this.assignmentSubmittingStatus = '';
        this.failedSubmission = 'Something went wrong while submitting';

        setTimeout(() => {
          this.failedSubmission = ''
        }, 2000);
      })

    form.reset();
  }


  deleteAssignment(id) {
    for (let i = 0; i < this.allClassworks.length; i++) {
      if (this.allClassworks[i]._id === id) {
        this.allClassworks.splice(i, 1);
      }
    }

    this.classService.deleteAssignemnt(id).subscribe(res => {

    }, (err: Response) => {
      console.log(err)
    })
  }
}
