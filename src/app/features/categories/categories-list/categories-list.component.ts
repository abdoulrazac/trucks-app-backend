import { Component, OnInit } from "@angular/core";
import { CategoriesService } from "../categories.service";
import {
  ICategory,
  IDialog,
  IPaginator,
  IUrlParams,
} from "src/app/models/interfaces";
import { ConfirmationService, MenuItem, MessageService } from "primeng/api";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { findIndexById, roleSeverity } from "../../../shared/helpers";
import { CategoriesFormComponent } from "../categories-form/categories-form.component";

@Component({
  selector: "app-categories-list",
  templateUrl: "./categories-list.component.html",
  styleUrls: ["./categories-list.component.scss"],
})
export class CategoriesListComponent implements OnInit {
  page: number = 1;
  limit: number = 10;
  total: number = 10;
  orderBy: string = "";
  searchCategory: ICategory = new ICategory();

  ref: DynamicDialogRef | undefined;

  categories: ICategory[] = [];
  categoryData: ICategory = new ICategory();
  cols: any[] = [];
  items: MenuItem[] = [];
  rowsPerPageOptions = [10, 20, 50];

  protected readonly roleSeverity = roleSeverity;
  constructor(
    private categoryService: CategoriesService,
    private messageService: MessageService,
    private dialogService: DialogService,
    private confirmService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.getList();

    this.cols = [
      { field: "label", header: "label" },
      { field: "description", header: "description" },
    ];
  }

  getList() {
    const urlParams: IUrlParams<ICategory> = {
      pagination: {
        offset: this.page,
        limit: this.limit,
      },
      filterData: this.searchCategory,
    };
    this.categoryService.getList(urlParams).subscribe({
      next: (res) => {
        this.categories = res.data ? res.data : [];
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
   * Adds a new category by opening the accounts form component
   * and subscribing to the onClose event.
   *
   * @return {void}
   */
  openDialog(category?: ICategory) {
    const isNew = !!category;
    this.ref = this.dialogService.open(CategoriesFormComponent, {
      header: isNew ? "Nouvelle catégorie" : "Modifier catégorie",
      data: {
        isNew: isNew,
        category: category ? category : new ICategory(),
      },
    });

    this.ref.onClose.subscribe((obj: IDialog<ICategory>) => {
      if (obj.save && !isNew && obj.data.id) {
        const idx = findIndexById(obj.data.id, this.categories);
        this.categories[idx] = obj.data;

        this.messageService.add({
          severity: "info",
          summary: "Info",
          detail: "Catégorie mise à jour !",
        });
      }
      if (obj.save && isNew) {
        this.getList();
      } else {
        this.messageService.add({
          severity: "info",
          summary: "Info",
          detail: "Utilisateur en cache",
        });
        this.categoryData = obj.data;
      }
    });
  }

  updateParams(event: IUrlParams<ICategory> = {}) {
    this.getList();
  }
  resetParams() {
    this.searchCategory = new ICategory();
    this.getList();
  }
  onPageChange(event: IPaginator) {
    this.page = +event.page;
    this.limit = +event.rows;
    this.getList();
  }
}
