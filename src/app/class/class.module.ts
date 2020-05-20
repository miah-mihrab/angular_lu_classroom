import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassRoutingModule } from './class-routing.module';
import { ClasroomComponent } from './clasroom/clasroom.component';
import { ClassorkComponent } from './classork/classork.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ClasroomComponent, ClassorkComponent],
  imports: [
    CommonModule,
    ClassRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]

})
export class ClassModule { }
