import { RoutineComponent } from './routine/routine.component';
import { ResultComponent } from './result/result.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './../guard/auth/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '', component: ProfileComponent, canActivate: [AuthGuard],
        children: [
            { path: 'result', component: ResultComponent },
            { path: 'routine', component: RoutineComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }
