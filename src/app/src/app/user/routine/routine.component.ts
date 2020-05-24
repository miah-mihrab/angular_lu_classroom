import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-routine',
  templateUrl: './routine.component.html',
  styleUrls: ['./routine.component.css']
})
export class RoutineComponent implements OnInit {
  user: any;

  constructor() { }

  ngOnInit(): void {
    this.user = JSON.parse(atob(localStorage.getItem('lu-user')));
    this.getClassRoutine()
  }


  getClassRoutine() {
    console.log("HERE")
    let section = this.user.section;
    let semester = this.user.semester;
    let sem_sect;

    if (section != null && section != "" && section.length > 0) {
      sem_sect = `${semester}+(${section})`
    } else {
      sem_sect = semester.trim();
    }
    console.log(sem_sect)
    async function getRoutine(cb) {

      let routine = [];
      let data = `action=get-event-feed&program=369&room=0&section=10 (E)`
      let xhr = new XMLHttpRequest();
      xhr.open('post', 'https://www.lus.ac.bd/wp-admin/admin-ajax.php', true);
      xhr.setRequestHeader('Content-type', "application/x-www-form-urlencoded");
      xhr.send(data);
      xhr.onload = async () => {
        let obj = null;
        try {
          obj = xhr.responseText
          console.log(obj)
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

          let courseTitle = routineArray[i].title.toString().trim().split('by');

          let teacher = courseTitle[1].toString().trim().split(' in');
          // console.log(teacher)
          let startTime = stTime.toDateString();
          let day = startTime.split(' ');
          // for (let i = 0; i < day.length; i++) {
          //     if (day[i] === 'Sat') {
          //         day[i] += 'urday'
          //     } else if (day[i] === 'Thu') {
          //         day[i] += "rsday"
          //     } else if (day[i] === 'Tue') {
          //         day[i] += "sday"
          //     } else if (day[i] === 'Wed') {
          //         day[i] += 'nesday'
          //     } else {
          //         day[i] += 'day'
          //     }
          // }
          // if (days[new Date().getDay()] === day[i]) h3.innerHTML = day[i]
          // else {
          //     h3.innerHTML = "Day"
          // }

          h3.innerHTML = "Weekly Routine"


          // th = document.createElement('th');
          // th.innerHTML = 'Grade';
          // tr.appendChild(th);
          let tbody = table.createTBody();
          //for (let i = 0; i < row; i++) {
          //let tr = document.createElement('tr');
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
          // td = tr.insertCell(4);
          // td.innerHTML = courses[i].grade

          //tr.appendChild(td)
          //table += `<td>${courses[j]}</td>`

          //table += '</tr>'
          //   }
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
