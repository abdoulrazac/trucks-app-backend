import { Component, OnInit } from "@angular/core";
import { AccountsService } from "../accounts.service";
import {
  IDialog,
  IPaginator,
  ISort,
  IUrlParams,
  IUser,
} from "src/app/models/interfaces";
import { MenuItem, MessageService } from "primeng/api";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { AccountsFormComponent } from "../accounts-form/accounts-form.component";
import { Router } from "@angular/router";

@Component({
  selector: "app-accounts-list",
  templateUrl: "./accounts-list.component.html",
  styleUrls: ["./accounts-list.component.scss"],
})
export class AccountsListComponent implements OnInit {
  page: number = 0;
  limit: number = 20;
  total: number = 10;
  orderBy: string = "";
  searchUser: IUser = new IUser();

  ref: DynamicDialogRef | undefined;

  users!: IUser[];
  userData: IUser = new IUser();
  cols: any[] = [];
  items: MenuItem[] = [];
  rowsPerPageOptions = [20, 40, 100];

  constructor(
    private accountService: AccountsService,
    private messageService: MessageService,
    private dialogService: DialogService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cols = [
      { code: "name", name: "Nom et prénom" },
      { code: "username", name: "Nom d'utilisateur" },
      { code: "email", name: "Email" },
      { code: "numTel", name: "Téléphone" },
      { code: "roles", name: "Roles" },
      { code: "status", name: "Statut" },
      { code: "isAccountDisabled", name: "Suspendu ?" },
    ];
    this.getList();
  }

  /**
   * Retrieves a list of users from the specified URL parameters.
   *
   * @return {void} This function does not return a value.
   */
  getList() {
    const urlParams: IUrlParams<IUser> = {
      pagination: {
        offset: this.page,
        limit: this.limit,
      },
      filterData: this.searchUser,
    };
    this.accountService.getList(urlParams).subscribe({
      next: (res) => {
        this.users = res.data ? res.data : [];
        this.total = res.meta?.count ? res.meta.count : 0;
      },
      error: (error) => {
        this.messageService.add({
          severity: "warn",
          summary: "Erreur",
          detail: "Impossible de récuperer la list !",
        });
      },
    });
  }

  /**
   * Adds a new user by opening the accounts form component
   * and subscribing to the onClose event.
   *
   * @return {void}
   */
  addNew() {
    this.ref = this.dialogService.open(AccountsFormComponent, {
      header: "Nouvel utilisateur",
      data: {
        isNew: true,
        user: this.userData,
      },
    });

    this.ref.onClose.subscribe((obj: IDialog<IUser>) => {
      if (!obj.save) {
        this.messageService.add({
          severity: "info",
          summary: "Info",
          detail: "Utilisateur en cache",
        });
        this.userData = obj.data;
      } else {
        this.getList();
      }
    });
  }

  updateParams(event: IUrlParams<IUser> = {}) {
    this.getList();
  }
  resetParams() {
    this.searchUser = new IUser();
    this.getList();
  }
  onPageChange(event: IPaginator) {
    this.page = +event.page;
    this.limit = +event.rows;
    this.getList();
  }

  onSort(event: ISort) {
    this.orderBy = +event.order < 0 ? "-" + event.field : event.field;
    this.getList();
  }
}
