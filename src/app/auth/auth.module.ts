import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "src/app/shared/shared.module";
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { MessageService } from 'primeng/api';
import { LogoutComponent } from './logout/logout.component'; 


@NgModule({
  declarations: [
    LoginComponent,
    ResetPasswordComponent,
    LogoutComponent, 
  ],
  imports: [
    CommonModule,
    SharedModule,
    AuthRoutingModule
  ],
  providers : [
    MessageService
  ]
})
export class AuthModule { }
