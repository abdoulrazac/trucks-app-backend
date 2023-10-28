import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CategoriesRoutingModule } from "./categories-routing.module";
import { CategoriesListComponent } from "./categories-list/categories-list.component";
import { CategoriesDetailsComponent } from "./categories-details/categories-details.component";
import { SharedModule } from "src/app/shared/shared.module";
import { CategoriesFormComponent } from "./categories-form/categories-form.component";
import { CardModule } from "primeng/card";

@NgModule({
  declarations: [
    CategoriesListComponent,
    CategoriesDetailsComponent,
    CategoriesFormComponent,
  ],
  imports: [CommonModule, SharedModule, CategoriesRoutingModule, CardModule],
})
export class CategoriesModule {}
