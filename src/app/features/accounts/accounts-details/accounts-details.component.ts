import { Component, ElementRef, ViewChild } from "@angular/core";
import { IDialog, IUser } from "../../../models/interfaces";
import { MenuItem, MessageService } from "primeng/api";
import { ActivatedRoute, Router } from "@angular/router";
import { AccountsService } from "../accounts.service";
import {
  APP_ACCOUNTANT_HOME,
  APP_RESOURCE_USER,
} from "../../../models/app-path";
import { bufferToFile, roleSeverity } from "../../../shared/helpers";
import { AccountsFormComponent } from "../accounts-form/accounts-form.component";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { statusSeverity } from "../../../shared/helpers/status-severity";

@Component({
  selector: "app-accounts-details",
  templateUrl: "./accounts-details.component.html",
  styleUrls: ["./accounts-details.component.scss"],
})
export class AccountsDetailsComponent {
  protected readonly roleSeverity = roleSeverity;
  protected readonly APP_RESOURCE_USER = APP_RESOURCE_USER;

  user: IUser = new IUser();
  avatar: string | null = null;
  avatarFile!: File;

  menuItems!: MenuItem[];
  panelItems!: MenuItem[];
  activeItem!: MenuItem;

  ref: DynamicDialogRef | undefined;
  @ViewChild("fileInput", { static: true }) fileInput!: ElementRef;
  constructor(
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private accountService: AccountsService,
    private messageService: MessageService,
    private dialogService: DialogService
  ) {
    this.panelItems = [
      { label: "Acceuil", icon: "pi pi-fw pi-home" },
      { label: "Voyages", icon: "pi pi-fw pi pi-truck" },
      { label: "Pannes", icon: "pi pi-fw pi pi-exclamation-triangle" },
      { label: "Documents", icon: "pi pi-fw pi-file" },
      { label: "Settings", icon: "pi pi-fw pi-cog" },
    ];
    this.activeItem = this.panelItems[0];
    this.menuItems = [
      {
        icon: "pi pi-pencil",
        command: () => this.openDialog(),
        tooltipOptions: {
          tooltipLabel: "Modifier",
          tooltipPosition: "left",
        },
      },
      {
        icon: "pi pi-key",
        command: () => this.openDialog(true),
        tooltipOptions: {
          tooltipLabel: "Changer mot de passe",
          tooltipPosition: "left",
        },
      },
      {
        icon: "pi pi-upload",
        command: () => this.selectFile(),
        tooltipOptions: {
          tooltipLabel: "Modifier photo",
          tooltipPosition: "left",
        },
      },
    ];
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      const { id } = params;
      this.getAvatar(id);
      this.getUser(id);
    });
  }

  getAvatar(id: number) {
    this.accountService.getAvatarByUserId(id).subscribe((res) => {
      if (res.data?.buffer.data && res.data?.name) {
        this.avatar = bufferToFile(res.data.buffer.data, res.data.name);
      }
    });
  }

  getUser(id: number) {
    this.accountService.getById(id).subscribe({
      next: (res) => {
        if (res.data) {
          this.user = res.data;
        } else {
          this.messageService.add({
            severity: "warn",
            summary: "Erreur",
            detail: "Impossible de récuperer l'utilisateur !",
          });
          this.route.navigate([APP_RESOURCE_USER]);
        }
      },
      error: (error) => {
        this.messageService.add({
          severity: "warn",
          summary: "Erreur",
          detail: "Impossible de récuperer l'utilisateur !",
        });
        this.route.navigate([APP_RESOURCE_USER]);
      },
    });
  }
  selectFile() {
    this.fileInput.nativeElement.click();
  }
  onUpload(event: any) {
    if (event.target?.files[0]) {
      const id = this.user.id || 0;
      const uploadData = new FormData();
      uploadData.append("avatar", event.target.files[0]);

      this.accountService.update(+id, uploadData).subscribe({
        next: (res) => {
          this.avatar = URL.createObjectURL(event.target.files[0]);
          this.messageService.add({
            severity: "info",
            summary: "Success",
            detail: "File Uploaded with Basic Mode",
          });
        },
        error: (error) => {
          this.messageService.add({
            severity: "warn",
            summary: "Erreur",
            detail: error.details.message,
          });
        },
      });
    }
  }

  openDialog(isNewPassword: boolean = false) {
    this.ref = this.dialogService.open(AccountsFormComponent, {
      header: "Modifier l'utilisateur",
      data: {
        isNew: false,
        isNewPassword: isNewPassword,
        data: this.user,
      },
    });
    this.ref.onClose.subscribe((obj: IDialog<IUser>) => {
      if (!obj.save) {
        this.user = obj.data;
      }
    });
  }
  onActiveItemChange(event: MenuItem) {
    this.activeItem = event;
  }

  protected readonly statusSeverity = statusSeverity;
}
