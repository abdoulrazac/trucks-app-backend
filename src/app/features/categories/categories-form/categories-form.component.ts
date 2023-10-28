import { Component, OnInit } from "@angular/core";
import { ICategory, IDialog } from "../../../models/interfaces";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { CategoriesService } from "../categories.service";
import { MessageService } from "primeng/api";

@Component({
  selector: "app-categories-form",
  templateUrl: "./categories-form.component.html",
  styleUrls: ["./categories-form.component.scss"],
})
export class CategoriesFormComponent implements OnInit {
  submitted: boolean = false;
  form!: FormGroup;
  category!: ICategory;
  isNew!: boolean;
  isLoading!: boolean;

  constructor(
    private fb: FormBuilder,
    public ref: DynamicDialogRef,
    private dialogConfig: DynamicDialogConfig,
    private categoryService: CategoriesService,
    private messageService: MessageService
  ) {
    this.isNew = this.dialogConfig.data?.isNew;
    this.category = this.dialogConfig.data?.category;
  }

  ngOnInit() {
    this.form = this.buildForm();
  }

  buildForm() {
    return this.fb.group(
      {
        id: [],
        label: [
          this.category.label,
          [Validators.required, Validators.minLength(5)],
        ],
        description: [this.category.description, [Validators.minLength(10)]],
      },
      {
        updateOn: "blur",
      }
    );
  }

  save() {
    this.isLoading = true;
    if (!this.isNew && this.category.id) {
      this.categoryService
        .update(+this.category.id, { ...this.form.value })
        .subscribe({
          next: (res) => {
            this.isLoading = false;
            if (res.data && res.data.id) {
              this.category = res.data;
              this.messageService.add({
                severity: "success",
                summary: "Success",
                detail: "Catégorie miss à jour avec succès !",
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
      this.categoryService.create({ ...this.form.value }).subscribe({
        next: (res) => {
          this.isLoading = false;
          if (res.data) {
            this.messageService.add({
              severity: "success",
              summary: "Success",
              detail: "Catégorie créée avec succès !",
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

  hideDialog(category: ICategory, save: boolean = false) {
    const data: IDialog<ICategory> = {
      isNew: this.isNew,
      save: save,
      data: category,
    };
    this.ref.close(data);
  }
}
