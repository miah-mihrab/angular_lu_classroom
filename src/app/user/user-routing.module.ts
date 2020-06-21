import { ClassRoutineComponent } from './class-routine/class-routine.component';
import { StudentResultComponent } from './student-result/student-result.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './../guard/auth/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '', component: ProfileComponent, canActivate: [AuthGuard],
        children: [
            { path: 'result', component: StudentResultComponent },
            { path: 'routine', component: ClassRoutineComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }
