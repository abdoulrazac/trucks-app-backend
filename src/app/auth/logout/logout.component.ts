import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-logout',
  template: ''
})
export class LogoutComponent implements OnInit {
  constructor(
    private authService : AuthenticationService,
    private router : Router
  ){}

  ngOnInit(): void {
    this.authService.logout();
    this.router.navigate(['/'])
  }
}
