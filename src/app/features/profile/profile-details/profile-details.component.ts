import { Component } from "@angular/core";
import { AuthenticationService } from "../../../core/services/auth.service";
import { AccountsService } from "../../accounts/accounts.service";
import { MessageService } from "primeng/api";
import { IDialog, IUser } from "../../../models/interfaces";
import { AccountsFormComponent } from "../../accounts/accounts-form/accounts-form.component";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { roleSeverity } from "../../../shared/helpers";
import { statusSeverity } from "../../../shared/helpers/status-severity";

@Component({
  selector: "app-profile-details",
  templateUrl: "./profile-details.component.html",
  styleUrls: ["./profile-details.component.scss"],
})
export class ProfileDetailsComponent {
  user: IUser = new IUser();
  selectedFile!: File;
  selectedFileUrl!: string;

  ref: DynamicDialogRef | undefined;
  constructor(
    private authService: AuthenticationService,
    private accountService: AccountsService,
    private messageService: MessageService,
    private dialogService: DialogService
  ) {
    this.accountService.getMe().subscribe({
      next: (res) => (this.user = res.data ? res.data : new IUser()),
    });
  }
  onFileSelect(event: any) {
    this.selectedFile = event.files[0];
    this.selectedFileUrl = URL.createObjectURL(this.selectedFile);
  }

  editImage() {
    // Implement your image editing logic here
    // You can open a dialog or an editor for image manipulation
    this.messageService.add({
      severity: "info",
      summary: "Édition d'image",
      detail: "Vous pouvez implémenter votre logique d'édition d'image ici.",
    });
  }

  openDialog(isNewPassword: boolean) {
    this.ref = this.dialogService.open(AccountsFormComponent, {
      header: "Modifier l'utilisateur",
      data: {
        isNew: false,
        isNewPassword: isNewPassword,
        data: this.user,
      },
    });

    this.ref.onClose.subscribe((obj: IDialog<IUser>) => {
      if (obj.save) this.user = obj.data;
    });
  }

  protected readonly roleSeverity = roleSeverity;
  protected readonly statusSeverity = statusSeverity;
}
