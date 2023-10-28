import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppLayoutComponent} from "src/app/layout/app.layout.component";
import {CategoriesListComponent} from "./categories-list/categories-list.component";
import {CategoriesDetailsComponent} from "./categories-details/categories-details.component";

const routes: Routes = [
  {
    path : '',
    component : AppLayoutComponent,
    children : [
      {path : '', component : CategoriesListComponent},
      {path : 'details/:id', component : CategoriesDetailsComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
