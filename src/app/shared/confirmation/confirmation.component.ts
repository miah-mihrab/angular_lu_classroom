import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  @Output() confirmDeleting = new EventEmitter();
  constructor() { }

  ngOnInit(): void { }
  showModal() { }

  confirmation() {
    this.confirmDeleting.emit(true)
  }
}
