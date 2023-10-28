import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AccountsRoutingModule } from "./accounts-routing.module";
import { AccountsListComponent } from "./accounts-list/accounts-list.component";
import { AccountsDetailsComponent } from "./accounts-details/accounts-details.component";
import { SharedModule } from "src/app/shared/shared.module";
import { AccountsFormComponent } from "./accounts-form/accounts-form.component";
import { CardModule } from "primeng/card";
import { AccountsCardComponent } from './accounts-card/accounts-card.component';
import { AccountsTravelComponent } from './accounts-travel/accounts-travel.component';
import { AccountsExpenseComponent } from './accounts-expense/accounts-expense.component';
import { AccountsDocumentComponent } from './accounts-document/accounts-document.component';
import { AccountsStatisticComponent } from './accounts-statistic/accounts-statistic.component';

@NgModule({
  declarations: [
    AccountsListComponent,
    AccountsDetailsComponent,
    AccountsFormComponent,
    AccountsCardComponent,
    AccountsTravelComponent,
    AccountsExpenseComponent,
    AccountsDocumentComponent,
    AccountsStatisticComponent,
  ],
  imports: [CommonModule, SharedModule, AccountsRoutingModule, CardModule],
})
export class AccountsModule {}
