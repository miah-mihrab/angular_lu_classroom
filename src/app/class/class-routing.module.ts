import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClasroomComponent } from './clasroom/clasroom.component'
import { ClassorkComponent } from './classork/classork.component'
const routes: Routes = [
  {
    path: '', component: ClasroomComponent,
    children: [
      { path: 'classwork', component: ClassorkComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassRoutingModule { }
