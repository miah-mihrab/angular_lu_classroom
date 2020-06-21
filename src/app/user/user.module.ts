import { UserRoutingModule } from './user-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { StudentResultComponent } from './student-result/student-result.component';
import { ClassRoutineComponent } from './class-routine/class-routine.component';



@NgModule({
  declarations: [ProfileComponent, StudentResultComponent, ClassRoutineComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    UserRoutingModule,
  ]
})
export class UserModule { }
