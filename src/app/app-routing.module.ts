import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./home/home.module')
        .then(m => m.HomeModule)
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./auth/auth.module')
        .then(m => m.AuthModule)
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('./auth/auth.module')
        .then(m => m.AuthModule)
  },
  {
    path: 'profile/:id',
    loadChildren: () =>
      import('./user/user.module')
        .then(m => m.UserModule)
  },
  {
    path: 'classroom/:id',
    loadChildren: () =>
      import('./class/class.module')
        .then(m => m.ClassModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
