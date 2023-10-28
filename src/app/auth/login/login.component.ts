import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { AuthenticationService } from "src/app/core/services/auth.service";
import { StorageService } from "src/app/core/services/storage.service";
import { LayoutService } from "src/app/layout/service/app.layout.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading!: boolean;

  constructor(
    public layoutService: LayoutService,
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private messageService: MessageService,
    private localStorage: StorageService
  ) {
    const savedUser = localStorage.getItem("savedUser", false) || "";
    this.loginForm = fb.group(
      {
        username: [savedUser, [Validators.required, Validators.minLength(6)]],
        password: ["", [Validators.minLength(8)]],
        rememberMe: [!!savedUser],
      },
      { updateOn: "blur" }
    );
  }

  ngOnInit(): void {
    if (this.authService.getCurrentUser()) {
      this.router.navigate(["/welcome"]);
    }
  }

  submit() {
    this.isLoading = true;
    const { username, password, rememberMe } = this.loginForm.value;

    this.authService.login(username.toLowerCase(), password).subscribe({
      next: (response) => {
        if (response) {
          if (rememberMe) {
            this.localStorage.setItem("savedUser", username);
          } else {
            this.localStorage.removeItem("savedUser");
          }
          this.router.navigate(["/welcome"]);
        } else {
          this.isLoading = false;
          this.messageService.add({
            severity: "warn",
            summary: "Echec",
            detail: "Identifiant incorrect ... ",
          });
          this.loginForm.controls["password"].reset();
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.messageService.add({
          severity: "error",
          summary: "Echec",
          detail: "Identifiant incorrect !",
        });
      },
    });
  }
}
