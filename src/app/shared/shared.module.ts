import { SuccessComponent } from './success/success.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { ClassCardComponent } from './class-card/class-card.component';
import { RouterModule } from '@angular/router';
import { ErrorsComponent } from './errors/errors.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';



@NgModule({
  declarations: [NavbarComponent, ClassCardComponent, ErrorsComponent, SuccessComponent, ConfirmationComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [NavbarComponent, ClassCardComponent, ErrorsComponent, SuccessComponent, ConfirmationComponent]
})
export class SharedModule { }
