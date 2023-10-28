import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from 'src/app/layout/app.layout.component';
import { DashComponent } from './dash/dash.component';

const routes: Routes = [
  { 
    path: '',
    component: AppLayoutComponent,
      children: [
          { path: '', component : DashComponent}
      ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
