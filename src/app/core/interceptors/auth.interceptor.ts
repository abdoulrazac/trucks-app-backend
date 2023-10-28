import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse,
} from "@angular/common/http";
import { HttpRequest } from "@angular/common/http";
import { HttpHandler } from "@angular/common/http";
import { HttpEvent } from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";

import { AuthenticationService } from "../services/auth.service";
import { JwtService } from "../services/jwt.service";
import { ApiService } from "../services/api.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthenticationService,
    private jwtSerivce: JwtService,
    private api: ApiService,
    private router: Router
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let cloned = req.clone();

    let accessToken = this.authService.getAccessToken();
    const refreshToken = this.authService.getRefreshToken();
    if (
      accessToken &&
      this.jwtSerivce.isExpiredToken(accessToken) &&
      refreshToken &&
      this.jwtSerivce.isExpiredToken(refreshToken)
    ) {
      this.router.navigate(["/auth/logout"]);
    }
    if (
      accessToken &&
      this.jwtSerivce.isExpiredToken(accessToken) &&
      refreshToken &&
      !this.jwtSerivce.isExpiredToken(refreshToken)
    ) {
      this.authService.refreshToken();
      accessToken = this.authService.getAccessToken();
    }
    if (accessToken && !this.jwtSerivce.isExpiredToken(accessToken)) {
      cloned = req.clone({
        url: this.api.BASE_URL + req.url,
        headers: req.headers.set("Authorization", "Bearer " + accessToken),
      });
    }
    return next.handle(cloned).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.router.navigate(["/auth/login"]);
        }
        return throwError({ ...err.error.error });
      })
    );
  }
}
