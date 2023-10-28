import { Component, OnInit } from "@angular/core";
import { IDialog, IUser } from "../../../models/interfaces";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { matchFields } from "../../../shared/validators/matchFieldsValidator";
import { ACCOUNT_STATUS, ROLES } from "../../../models/constants";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { AuthenticationService } from "../../../core/services/auth.service";
import { AccountsService } from "../accounts.service";
import { MessageService } from "primeng/api";

@Component({
  selector: "app-accounts-form",
  templateUrl: "./accounts-form.component.html",
  styleUrls: ["./accounts-form.component.scss"],
})
export class AccountsFormComponent implements OnInit {
  submitted: boolean = false;
  form!: FormGroup;
  isLoading!: boolean;
  isAdmin!: boolean;
  rolesList!: any[];
  statusList!: any[];
  user!: IUser;
  isNew!: boolean;
  isNewPassword!: boolean;

  constructor(
    private fb: FormBuilder,
    public ref: DynamicDialogRef,
    private dialogConfig: DynamicDialogConfig<IDialog<IUser>>,
    private authService: AuthenticationService,
    private accountService: AccountsService,
    private messageService: MessageService
  ) {
    this.isNew = !!this.dialogConfig.data?.isNew;
    this.isNewPassword = !!this.dialogConfig.data?.isNewPassword;
    this.user = this.dialogConfig.data?.data || new IUser();
    this.isAdmin = this.authService.isAdmin();
    this.isLoading = false;
  }

  ngOnInit() {
    this.rolesList = Object.values(ROLES).map((v) => v);
    this.statusList = Object.values(ACCOUNT_STATUS).map((v) => v);
    this.form = this.buildForm(this.isNew, this.isNewPassword);
  }

  buildForm(isNew: boolean = false, isNewPassword: boolean = false) {
    const basicFrom = {
      id: [],
      email: [this.user.email, [Validators.required, Validators.email]],
      numTel: [this.user.numTel, [Validators.required]],
    };
    const adminFrom = {
      name: [this.user.name, [Validators.required, Validators.minLength(6)]],
      username: [this.user.username, [Validators.minLength(8)]],
      roles: [this.user.roles, [Validators.required]],
      status: [this.user.status, [Validators.required]],
      isAccountDisabled: new FormControl<boolean>(
        !!this.user.isAccountDisabled
      ),
    };

    const passwordForm = {
      password: ["", [Validators.required, Validators.minLength(6)]],
      confirmPassword: ["", Validators.required],
    };
    if (isNew) {
      return this.fb.group(
        { ...basicFrom, ...adminFrom, ...passwordForm },
        {
          updateOn: "blur",
          validators: [matchFields("password", "confirmPassword")],
        }
      );
    }
    if (isNewPassword) {
      return this.fb.group(passwordForm, {
        updateOn: "blur",
        validators: [matchFields("password", "confirmPassword")],
      });
    }

    if (this.isAdmin) {
      return this.fb.group(
        { ...basicFrom, ...adminFrom },
        {
          updateOn: "blur",
          validators: [matchFields("password", "confirmPassword")],
        }
      );
    }
    return this.fb.group(basicFrom, {
      updateOn: "blur",
    });
  }

  save() {
    this.isLoading = true;
    if (!this.isNew && this.user.id) {
      this.accountService
        .update(+this.user.id, { ...this.form.value })
        .subscribe({
          next: (res) => {
            this.isLoading = false;
            if (res.data && res.data.id) {
              this.user = res.data;
              this.messageService.add({
                severity: "success",
                summary: "Success",
                detail: "Utilisateur mis à jour avec succès !",
              });
              this.hideDialog(res.data, true);
            }
          },
          error: (error) => {
            this.isLoading = false;
            const messages = Array.isArray(error.details.message)
              ? error.details.message
              : Array(error.details.message);
            messages.map((m: string) => {
              this.messageService.add({
                severity: "warn",
                summary: "Erreur",
                detail: m,
              });
            });
          },
        });
    }
    if (this.isNew) {
      this.accountService.create({ ...this.form.value }).subscribe({
        next: (res) => {
          this.isLoading = false;
          if (res.data) {
            this.messageService.add({
              severity: "success",
              summary: "Success",
              detail: "Utilisateur créé avec succès !",
            });
            this.hideDialog(res.data, true);
          }
        },
        error: (error) => {
          this.isLoading = false;
          const messages = Array.isArray(error.details.message)
            ? error.details.message
            : Array(error.details.message);
          messages.map((m: string) => {
            this.messageService.add({
              severity: "warn",
              summary: "Erreur",
              detail: m,
            });
          });
        },
      });
    }
  }

  hideDialog(user: IUser, save: boolean) {
    const data: IDialog<IUser> = {
      isNew: this.isNew,
      save: save,
      data: user,
    };
    this.ref.close(data);
  }
}
