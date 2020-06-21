import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-routine',
  templateUrl: './routine.component.html',
  styleUrls: ['./routine.component.css']
})
export class RoutineComponent implements OnInit {
  user: any;
  semester;
  section;
  programName;
  programNames;
  program;
  sem_sect;
  programsNo = [
    {
      "Master of Arts in Islamic Studies": '42920',
      "Bachelor of Arts (Honours) in Islamic Studies": '42919',
      "Bachelor of Tourism And Hospitality Management": '31527',
      "B.Sc. in Civil Engineering": '604',
      "Bachelor of Architecture": "481",
      "Master of Public Health": '479',
      "Master of Laws": '440',
      "Bachelor of Laws (Honours)": '439',
      "Master of Business Administration (Executive)": '425',
      "Master of Business Administration": '424',
      "Bachelor of Business Administration (Honours)": "423",
      "Master of Arts in English": '414',
      "Bachelor of Arts (Honours) in English": '412',
      "B.Sc. (Honours) in Electrical & Electronic Engineering": '398',
      "B.Sc. (Honours) in Computer Science & Engineering": '369'
    }
  ]
  constructor() { }

  ngOnInit(): void {
    this.programNames = Object.keys(this.programsNo)
    this.user = JSON.parse(atob(localStorage.getItem('lu-user')));
    this.section = this.user.section;
    this.semester = this.user.semester;
    this.program = this.programsNo[this.user.department]
    this.getClassRoutine();
  }


  search() {
    this.program = this.programsNo[this.programName];
    console.log(this.semester, this.section, this.program)
  }


  getClassRoutine() {

    if (this.section != null && this.section != "" && this.section.length > 0) {
      this.sem_sect = `${this.semester}+(${this.section})`
    } else {
      this.sem_sect = this.semester.trim();
    }

    async function getRoutine(cb) {

      let routine = [];
      let data = `action=get-event-feed&program=${this.program}&section=${this.sem_sect}`
      let xhr = new XMLHttpRequest();
      xhr.open('post', 'https://www.lus.ac.bd/wp-admin/admin-ajax.php', true);
      xhr.setRequestHeader('Content-type', "application/x-www-form-urlencoded");
      xhr.send(data);
      xhr.onload = async () => {
        let obj = null;
        try {
          obj = xhr.responseText

        } catch (e) {
          console.log(e);
        }
        if (obj) {
          return cb(JSON.parse(obj));
        }
      }

    }

    // CALLBACK
    getRoutine(routineArray => {
      console.log(routineArray)
      if (routineArray.length > 0) {
        console.log(routineArray)

        let h3 = document.createElement('h3');

        h3.classList.add('day', 'text-center')
        document.querySelector('.container').appendChild(h3);
        let row = routineArray.length;
        let col = 4;
        let table = document.createElement('table');
        table.classList.add('table');

        let header = table.createTHead();
        let tr = header.insertRow(0);
        let th = document.createElement('th');
        th.classList.add('text-center')
        th.innerHTML = 'Day';
        tr.appendChild(th);
        th = document.createElement('th');
        th.classList.add('text-center')
        th.innerHTML = 'Duration';
        tr.appendChild(th);
        th = document.createElement('th');
        th.classList.add('text-center')
        th.innerHTML = 'Course';
        tr.appendChild(th);
        th = document.createElement('th');
        th.classList.add('text-center')
        th.innerHTML = 'Teacher';
        tr.appendChild(th);
        th = document.createElement('th');
        th.classList.add('text-center')
        th.innerHTML = 'Room';
        tr.appendChild(th);

        for (let i = 0; i < routineArray.length; i++) {

          let stTime = new Date((routineArray[i].start));
          console.log(routineArray[i].start)
          // startTime = startTime.toDateString();
          let endTime = new Date((routineArray[i].end));
          // endTime = endTime.toDateString();
          let startHours = stTime.getHours();
          let startMinutes = stTime.getMinutes();

          let endHours = endTime.getHours()
          let endMinutes = endTime.getMinutes();
          let duration = `${startHours}:${startMinutes} - ${endHours}:${endMinutes}`

          console.log(routineArray[i].title)
          let courseTitle = routineArray[i].title.toString().trim().split('by');

          let teacher = courseTitle[1] ? courseTitle.toString().trim().split(' in') : '';
          // console.log(teacher)
          let startTime = stTime.toDateString();
          let day = startTime.split(' ');

          h3.innerHTML = "Weekly Routine"

          let tbody = table.createTBody();
          tr = tbody.insertRow(0);
          if (day[0] === 'Sun') tr.style.backgroundColor = "#cdcdcd";
          else if (day[0] === 'Mon') tr.style.backgroundColor = "#D3D3D3";
          else if (day[0] === 'Tue') tr.style.backgroundColor = "#C0C0C0";
          else if (day[0] === 'Wed') tr.style.backgroundColor = "#A9A9A9";
          else if (day[0] === 'Thu') tr.style.backgroundColor = "#808080";
          let td = tr.insertCell(0);
          td.innerHTML = day[0];
          td = tr.insertCell(1);
          td.innerHTML = duration
          td = tr.insertCell(2);
          td.innerHTML = courseTitle[0]
          td = tr.insertCell(3);
          td.innerHTML = teacher[0]
          td = tr.insertCell(4);
          td.innerHTML = routineArray[i].location
          document.querySelector('.container').appendChild(table);
        }
      } else {
        // document.querySelector('.no-routine').style.marginTop = '2%';
        // document.querySelector('.no-routine').style.fontSize = '1.2rem';
        // document.querySelector('.no-routine').style.display = "flex";
      }
    });

  }
}
