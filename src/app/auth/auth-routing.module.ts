import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { LogoutComponent } from './logout/logout.component';

const routes: Routes = [
  {
    path : '',
    children : [
      {path : '', component : LoginComponent},
      {path : 'login', component : LoginComponent},
      {path : 'logout', component : LogoutComponent},
      {path : 'reset-password', component : ResetPasswordComponent},
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
