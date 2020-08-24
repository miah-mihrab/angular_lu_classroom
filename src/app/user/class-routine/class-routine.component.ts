import { programCodes } from './../../utils/ProgramCodes';
import { Component, OnInit } from '@angular/core';
// import * as programCodes from '../../utils/ProgramCodes'
@Component({
  selector: 'app-class-routine',
  templateUrl: './class-routine.component.html',
  styleUrls: ['./class-routine.component.css']
})
export class ClassRoutineComponent implements OnInit {

  user: any;

  noRoutineFound: boolean = false;
  fetchingRoutine: boolean = true;
  failedToFetchRoutine: boolean = false;

  semester;
  section;
  programName;
  programNames;
  program;
  sem_sect;
  programsNo = programCodes;
  constructor() { }

  ngOnInit(): void {
    this.programNames = Object.keys(this.programsNo)
    this.user = JSON.parse(atob(localStorage.getItem('lu-user')));
    this.section = this.user.section;
    this.semester = this.user.semester;
    this.program = this.programsNo[this.user.department];
    this.getClassRoutine(this.program);
  }


  search() {
    this.fetchingRoutine = true;
    this.noRoutineFound = false;
    this.failedToFetchRoutine = false;

    this.program = this.programsNo[this.programName];
    console.log(this.program)
    if (this.program) {
      this.getClassRoutine(this.program)
    } else {
      this.fetchingRoutine = false
      this.failedToFetchRoutine = true;
    }
  }


  getClassRoutine(prg) {

    let sem_sect
    if (this.section != null && this.section != "" && this.section.length > 0) {
      sem_sect = `${this.semester}+(${this.section.toUpperCase()})`
    } else {
      sem_sect = this.semester.trim();
    }

    async function getRoutine(cb) {

      document.querySelector('.routine-div').innerHTML = ''
      let routine = [];

      let data = `action=get-event-feed&program=${prg}&section=${sem_sect}`
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
      this.fetchingRoutine = false;
      if (routineArray.error) {
        this.failedToFetchRoutine = true;
      }
      else if (routineArray.length > 0) {

        let h3 = document.createElement('h3');

        h3.classList.add('day', 'text-center')
        document.querySelector('.routine-div').appendChild(h3);
        let row = routineArray.length;
        let col = 4;
        // let table = document.createElement('table');
        // table.classList.add('table');

        // let header = table.createTHead();
        // let tr = header.insertRow(0);
        // let th = document.createElement('th');
        // th.classList.add('text-center')
        // th.innerHTML = 'Day';
        // tr.appendChild(th);
        // th = document.createElement('th');
        // th.classList.add('text-center')
        // th.innerHTML = 'Duration';
        // tr.appendChild(th);
        // th = document.createElement('th');
        // th.classList.add('text-center')
        // th.innerHTML = 'Course';
        // tr.appendChild(th);
        // th = document.createElement('th');
        // th.classList.add('text-center')
        // th.innerHTML = 'Teacher';
        // tr.appendChild(th);
        // th = document.createElement('th');
        // th.classList.add('text-center')
        // th.innerHTML = 'Room';
        // tr.appendChild(th);

        let weekDays = {};
        let Sun = [];
        let Mon = [];
        let Tue = [];
        let Wed = [];
        let Thu = [];

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

          // let tbody = table.createTBody();
          // tr = tbody.insertRow(0);
          // if (day[0] === 'Sun') tr.style.backgroundColor = "#cdcdcd";
          // else if (day[0] === 'Mon') tr.style.backgroundColor = "#D3D3D3";
          // else if (day[0] === 'Tue') tr.style.backgroundColor = "#C0C0C0";
          // else if (day[0] === 'Wed') tr.style.backgroundColor = "#A9A9A9";
          // else if (day[0] === 'Thu') tr.style.backgroundColor = "#808080";


          if (day[0] === 'Sun') {
            Sun.push({
              day: day[0],
              duration,
              courseTitle: courseTitle[0],
              teacher: teacher[0],
              location: routineArray[0].location
            })
          }
          else if (day[0] === 'Mon') {
            Mon.push({
              day: day[0],
              duration,
              courseTitle: courseTitle[0],
              teacher: teacher[0],
              location: routineArray[0].location
            })
          }
          else if (day[0] === 'Tue') {
            Tue.push({
              day: day[0],
              duration,
              courseTitle: courseTitle[0],
              teacher: teacher[0],
              location: routineArray[0].location
            })
          }
          else if (day[0] === 'Wed') {
            Wed.push({
              day: day[0],
              duration,
              courseTitle: courseTitle[0],
              teacher: teacher[0],
              location: routineArray[0].location
            })
          }
          else if (day[0] === 'Thu') {
            Thu.push({
              day: day[0],
              duration,
              courseTitle: courseTitle[0],
              teacher: teacher[0],
              location: routineArray[0].location
            })
          }

          // weekDays[day[0]].push({
          //   day: day[0],
          //   duration,
          //   courseTitle: courseTitle[0],
          //   teacher: teacher[0],
          //   location: routineArray[0].location
          // })

          // let td = tr.insertCell(0);
          // td.innerHTML = day[0];
          // td = tr.insertCell(1);
          // td.innerHTML = duration
          // td = tr.insertCell(2);
          // td.innerHTML = courseTitle[0]
          // td = tr.insertCell(3);
          // td.innerHTML = teacher[0]
          // td = tr.insertCell(4);
          // td.innerHTML = routineArray[i].location
          // document.querySelector('.routine-div').appendChild(table);
        }
        console.log(weekDays);
        let table1 = document.createElement('table');
        table1.classList.add('table');


        let header = table1.createTHead();
        let tr1 = header.insertRow(0);

        let th1 = tr1.insertCell(0)

        th1.classList.add('text-center')
        th1.innerHTML = '';
        th1 = tr1.insertCell(0)
        tr1.appendChild(th1)

        th1.classList.add('text-center')
        th1.innerHTML = 'Sun';
        th1 = tr1.insertCell(0)
        tr1.appendChild(th1)

        th1 = tr1.insertCell(0);
        th1.innerHTML = 'Mon';
        th1.classList.add('text-center')
        tr1.appendChild(th1);

        th1 = tr1.insertCell(0);
        th1.innerHTML = 'Tue';
        th1.classList.add('text-center')
        tr1.appendChild(th1);

        th1 = tr1.insertCell(0);
        th1.innerHTML = 'Wed';
        th1.classList.add('text-center')
        tr1.appendChild(th1)

        th1 = tr1.insertCell(0);
        th1.innerHTML = 'Thurs';
        th1.classList.add('text-center')
        tr1.appendChild(th1)

        weekDays['Sun'] = Sun;
        weekDays['Mon'] = Mon;
        weekDays['Tue'] = Tue;
        weekDays['Wed'] = Wed;
        weekDays['Thu'] = Thu;

        let dayKeys = Object.keys(weekDays);

        console.log(weekDays)

        for (let i = 0; i < dayKeys.length; i++) {
          for (let j = 0; j < weekDays[dayKeys[i]].length; j++) {

          }
        }

        document.querySelector('.routine-div').appendChild(table1);



      } else {
        this.noRoutineFound = true;
      }
    });

  }
}
