import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'class-card',
  templateUrl: './class-card.component.html',
  styleUrls: ['./class-card.component.css']
})
export class ClassCardComponent implements OnInit {

  @Input() class;
  @Output() deleteClass = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  delete(id) {
    this.deleteClass.emit(id)
  }
}
