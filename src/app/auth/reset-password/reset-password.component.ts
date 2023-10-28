import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  loginForm!: FormGroup; 
  isLoading!: boolean; 
  isRequestDone!:boolean;

  constructor(
    public layoutService: LayoutService,
    private router: Router,
    private fb : FormBuilder,
    private authService: AuthenticationService,
    private messageService: MessageService,
    private localStorage : StorageService
  ) { }

  ngOnInit(): void {
    if(this.authService.isLogged){
      this.router.navigate(['/'])
    }
    const savedUserEmail = this.localStorage.getItem('savedUserEmail') || '' ;
    this.loginForm = this.fb.group({
      email: [savedUserEmail, [Validators.required, Validators.email]], 
      rememberMe: [savedUserEmail?true:false]
    }, { updateOn: 'blur'} );
  } 

  submit() {
    this.isLoading = true;
    const { email, password, rememberMe } = this.loginForm.value
     
    this.authService
      .passwordResetRequest(email.toLowerCase())
      .subscribe({
        next: (response) => {
          if (response) {
             this.isRequestDone
          } else {
            this.isLoading = false;
            this.messageService.add({ severity: 'warn', summary: 'Echec', detail: 'Identifiant incorrect ... ' });
            this.loginForm.controls['password'].reset();
          }
        },
        error: error => {
          this.messageService.add(error.error);
          this.isLoading = false;
        }
      });
  }
} 
