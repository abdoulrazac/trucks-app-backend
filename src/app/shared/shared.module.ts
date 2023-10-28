import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { CustomUiModule } from "../custom-ui/custom-material.module";
import { LimitToPipe } from "./pipes/limit-to.pipe";
import { LocalDatePipe } from "./pipes/local-date.pipe";
import { YesNoPipe } from "./pipes/yes-no.pipe";
import { DialogService } from "primeng/dynamicdialog";
import { ConfirmationService } from "primeng/api";

@NgModule({
  imports: [RouterModule, CustomUiModule, FormsModule, ReactiveFormsModule],
  declarations: [LimitToPipe, LocalDatePipe, YesNoPipe],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    CustomUiModule,
    LimitToPipe,
    LocalDatePipe,
    YesNoPipe,
  ],
  providers: [DialogService, ConfirmationService],
})
export class SharedModule {}
