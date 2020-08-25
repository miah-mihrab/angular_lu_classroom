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

        let weekDays = {};
        let Sun = [];
        let Mon = [];
        let Tue = [];
        let Wed = [];
        let Thu = [];

        let maxClass = 0;
        for (let i = 0; i < routineArray.length; i++) {

          let stTime = new Date((routineArray[i].start));

          let endTime = new Date((routineArray[i].end));
          let startHours = stTime.getHours();
          let startMinutes = stTime.getMinutes();

          let endHours = endTime.getHours()
          let endMinutes = endTime.getMinutes();
          let duration = `${startHours}:${startMinutes} - ${endHours}:${endMinutes}`

          let courseTitle = routineArray[i].title.toString().trim().split('by');

          let teacher = courseTitle[1] ? courseTitle.toString().trim().split(' in') : '';
          let startTime = stTime.toDateString();
          let day = startTime.split(' ');

          h3.innerHTML = "Weekly Routine"

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

          maxClass = Math.max(Sun.length, Mon.length, Tue.length, Wed.length, Thu.length);

        }

        let table1 = document.createElement('table');
        table1.classList.add('table', 'table-bordered');

        weekDays['Sun'] = Sun;
        weekDays['Mon'] = Mon;
        weekDays['Tue'] = Tue;
        weekDays['Wed'] = Wed;
        weekDays['Thu'] = Thu;

        let dayKeys = Object.keys(weekDays);
        let tbody = table1.createTBody()
        for (let i = dayKeys.length - 1; i >= 0; i--) {

          if (typeof weekDays[dayKeys[i]][0] != 'undefined') {
            let tr1: any;
            let th1: any;
            tr1 = tbody.insertRow(0);

            th1 = tr1.insertCell(0);
            for (let j = maxClass; j >= 0; j--) {

              if (weekDays[dayKeys[i]][j] != undefined && weekDays[dayKeys[i]][j]['day'] != undefined) {
                let tch = (weekDays[dayKeys[i]][j]['teacher']).toString().split(',')
                th1 = tr1.insertCell(0)
                th1.classList.add('text-center')
                th1.innerHTML = `${tch[0]}, <br> ${tch[1]}, <br> ${weekDays[dayKeys[i]][j]['duration']}, ${weekDays[dayKeys[i]][j]['location']}`;
                // tr1.appendChild(th1)
              }
            }
            // tr1 = tbody.insertRow(0);
            th1 = tr1.insertCell(0)
            th1.classList.add('text-center')

            th1.innerHTML = weekDays[dayKeys[i]][0].day
          }
          // th1.innerHTML = (typeof weekDays[dayKeys[i]][0] != 'undefined') ? weekDays[dayKeys[i]][0].day : '';
        }

        document.querySelector('.routine-div').appendChild(table1);

      } else {
        this.noRoutineFound = true;
      }
    });

  }
}
