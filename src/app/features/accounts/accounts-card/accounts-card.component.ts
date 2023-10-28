import { Component, EventEmitter, Input, Output } from "@angular/core";
import { findIndexById, roleSeverity } from "../../../shared/helpers";
import { IDialog, IUser } from "../../../models/interfaces";
import { APP_RESOURCE_USER } from "../../../models/app-path";
import { Router } from "@angular/router";
import { AccountsFormComponent } from "../accounts-form/accounts-form.component";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { AccountsService } from "../accounts.service";
import { MessageService } from "primeng/api";

@Component({
  selector: "app-accounts-card",
  templateUrl: "./accounts-card.component.html",
  styleUrls: ["./accounts-card.component.scss"],
})
export class AccountsCardComponent {
  ref: DynamicDialogRef | undefined;

  @Input() user!: IUser;
  protected readonly roleSeverity = roleSeverity;

  constructor(
    private router: Router,
    private dialogService: DialogService,
    private accountService: AccountsService,
    private messageService: MessageService
  ) {}

  edit() {
    this.ref = this.dialogService.open(AccountsFormComponent, {
      header: "Modification",
      data: {
        isNew: false,
        data: this.user,
      },
    });
    this.ref.onClose.subscribe((obj: IDialog<IUser>) => {
      if (obj.save) this.user = obj.data;
    });
  }
  open() {
    this.router.navigate([APP_RESOURCE_USER, this.user.id]);
  }
}
