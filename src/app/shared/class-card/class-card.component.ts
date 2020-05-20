import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'class-card',
  templateUrl: './class-card.component.html',
  styleUrls: ['./class-card.component.css']
})
export class ClassCardComponent implements OnInit {

  @Input() class;

  constructor() { }

  ngOnInit(): void {
  }

}
