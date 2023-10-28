import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppLayoutComponent } from "src/app/layout/app.layout.component";
import { AccountsListComponent } from "./accounts-list/accounts-list.component";
import { AccountsDetailsComponent } from "./accounts-details/accounts-details.component";

const routes: Routes = [
  {
    path: "",
    component: AppLayoutComponent,
    children: [
      { path: "", component: AccountsListComponent },
      { path: ":id", component: AccountsDetailsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountsRoutingModule {}
