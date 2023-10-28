import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "src/app/shared/shared.module";

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashComponent } from './dash/dash.component';


@NgModule({
  declarations: [
    DashComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
