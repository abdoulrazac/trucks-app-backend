import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import * as moment from 'moment';

import { AuthenticationService } from '../services/auth.service'; 
import { MessageService } from 'primeng/api';
import {JwtService} from "../services/jwt.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private messageService: MessageService,
        private authService: AuthenticationService,
        private jwtService : JwtService
    ) { }

    canActivate() {
        const accessToken = this.authService.getAccessToken();
        const refreshToken = this.authService.getRefreshToken();

        if (accessToken && !this.jwtService.isExpiredToken(accessToken)) {
            return true
        }
        if (accessToken && this.jwtService.isExpiredToken(accessToken) && refreshToken && !this.jwtService.isExpiredToken(refreshToken)) {
            this.authService.refreshToken()
            return true;
        }

        this.messageService.add({severity : 'warn', summary :'Session expirée', detail : 'Veuillez vous reconnecté'});
        this.router.navigate(['auth/login']);
        return false;
    }
}
