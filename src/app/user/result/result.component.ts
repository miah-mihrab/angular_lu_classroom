import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  loading: boolean = true;
  id;
  user: any;
  courses = [];
  showResult: boolean = false;
  student = [];
  fetchingResult: boolean = true;
  failedToFetchResult: boolean = false;

  userId;
  userBirthDate;
  constructor() { }

  ngOnInit(): void {
    this.user = JSON.parse(atob(localStorage.getItem('lu-user')));
    this.userId = this.user.id;
    this.result()
    this.userBirthDate = this.user.dob;
  }


  result() {
    console.log(this.userId)
    const id = this.userId;
    const birth_date = this.userBirthDate;

    this.fetchingResult = true;
    async function get_sem(cb) {
      let three_sem_result = [];
      let data = `action=get-result&student_id=${id}&birth_date=${birth_date}`
      let xhr = new XMLHttpRequest();
      xhr.open('post', 'https://www.lus.ac.bd/wp-admin/admin-ajax.php', true);
      xhr.setRequestHeader('Content-type', "application/x-www-form-urlencoded");
      xhr.send(data);
      xhr.onload = async () => {

        let obj = null;
        try {
          let student;
          obj = xhr.responseText
          if (obj) {
            let results = JSON.parse(obj);
            student = results.student;
            // console.log(student)

            let years = Object.keys(results.results);
            years = years.reverse();
            let k = 1;
            years.forEach(e => {
              let index = Object.keys(results.results[e])
              k++;
              index.forEach(et => {
                if (k <= 3) {
                  for (let i = 0; i < et.length; i++) {
                    if (((results.results[e])[et]).courses != null)
                      three_sem_result.push((results.results[e])[et]);
                  }
                }
              });
            });
          }
          return cb({ result: three_sem_result, student: student });
        } catch (err) {
          return cb({ error: "Something went wrong while fetching. Please check your network connection or try again later." });
        }

      }

    }
    get_sem(cb => {
      console.log(cb)
      this.fetchingResult = false;
      if (!cb.error) {
        this.student = cb.student;
        this.courses = cb.result;
      } else {
        this.failedToFetchResult = true;
      }
    })
  }


  resultToggle() {
    this.showResult = !this.showResult
  }
}
