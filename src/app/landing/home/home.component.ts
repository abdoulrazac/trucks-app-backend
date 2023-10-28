import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "src/app/core/services/auth.service";
import { LayoutService } from "src/app/layout/service/app.layout.service";
import { MessageService } from "primeng/api";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  isLogged!: boolean;
  captcha: string;
  isLoading: boolean = false;

  contactForm!: FormGroup;
  stats = {
    people: "2 500",
    sales: "210",
    experience: new Date().getFullYear() - 2019,
    destination: 50,
  };

  constructor(
    public layoutService: LayoutService,
    public router: Router,
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private messageService: MessageService
  ) {
    this.captcha = "";
  }

  ngOnInit(): void {
    if (this.authService.getCurrentUser()) {
      this.isLogged = true;
    }

    this.contactForm = this.fb.group({
      firstname: ["", [Validators.required]],
      lastname: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      phone: ["", [Validators.required]],
      message: ["", [Validators.required, Validators.minLength(10)]],
    });
  }
  scrolleTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  submit() {
    console.log(this.contactForm.value);
    if (this.contactForm.invalid) {
      this.messageService.add({
        severity: "warn",
        summary: "Erreur",
        detail: "Tous les champs sont requis ...",
      });
    } else {
      this.messageService.add({
        severity: "success",
        summary: "Success",
        detail: "Message envoyé avec succès ... ",
      });
    }
  }

  resolved(captchaResponse: string) {
    this.captcha = captchaResponse;
    console.log("resolved captcha with response: " + this.captcha);
  }
}
