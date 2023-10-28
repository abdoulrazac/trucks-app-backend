import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from 'src/app/layout/app.layout.component';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';

const routes: Routes = [
  {
    path : '',
    component : AppLayoutComponent,
    children : [
      {path : '', component : ProfileDetailsComponent},
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
