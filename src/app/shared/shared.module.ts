import { SuccessComponent } from './success/success.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { ClassCardComponent } from './class-card/class-card.component';
import { RouterModule } from '@angular/router';
import { ErrorsComponent } from './errors/errors.component';



@NgModule({
  declarations: [NavbarComponent, ClassCardComponent, ErrorsComponent, SuccessComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [NavbarComponent, ClassCardComponent, ErrorsComponent, SuccessComponent]
})
export class SharedModule { }
