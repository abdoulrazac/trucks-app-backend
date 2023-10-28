import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { delay, tap } from "rxjs/operators";

import { Observable, of } from "rxjs";
import { ApiService } from "./api.service";
import { StorageService } from "./storage.service";
import {
  IApiResponse,
  ICurrentUser,
  ILoginResponse,
  IRegister,
} from "src/app/models/interfaces";
import { JwtService } from "./jwt.service";
import { ROLES } from "../../models/constants";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  isWelcomed!: boolean;
  isLogged!: boolean;

  constructor(
    private http: HttpClient,
    private api: ApiService,
    private localStorage: StorageService,
    private jwtService: JwtService
  ) {}

  setIsWelcomed(value: boolean): void {
    this.isWelcomed = value;
  }

  login(
    username: string,
    password: string
  ): Observable<IApiResponse<ILoginResponse>> {
    return this.http
      .post(`${this.api.BASE_URL}/auth/login`, {
        username: username,
        password: password,
      })
      .pipe(
        tap({
          next: (response) => {
            if (response) {
              const { data } = <IApiResponse<ILoginResponse>>response;
              const user = this.jwtService.decodeToken(data?.accessToken);
              this.isLogged = true;
              this.localStorage.setItem("currentUser", JSON.stringify(user));
              this.setToken({
                accessToken: data?.accessToken,
                refreshToken: data?.refreshToken,
              });
            }
          },
        })
      );
  }

  logout(): void {
    // clear token remove user from local storage to log user out
    this.localStorage.removeItem("currentUser");
    this.localStorage.removeItem("accessToken");
    this.localStorage.removeItem("refreshToken");
    this.isWelcomed = false;
    this.isLogged = false;
  }

  register(newUser: IRegister) {
    return this.http.post(`${this.api.BASE_URL}/auth/register`, newUser).pipe(
      tap({
        next: (user) => {
          if (user) {
            this.localStorage.setItem("currentUser", JSON.stringify(user));
          }
        },
      })
    );
  }

  refreshToken(): void {
    const refreshToken = this.getRefreshToken();
    this.http
      .post<IApiResponse<ILoginResponse>>(
        `${this.api.BASE_URL}/auth/refresh-token`,
        { refreshToken: refreshToken }
      )
      .subscribe({
        next: (response) => {
          const { data } = response;
          const user = this.jwtService.decodeToken(data?.accessToken);
          this.setToken({
            accessToken: data?.accessToken,
            refreshToken: data?.refreshToken,
          });
        },
      });
  }

  activateAccount(email: string, code: string) {
    return this.http
      .post(`${this.api.BASE_URL}/auth/activate-account`, {
        email: email,
        code: code,
      })
      .pipe(
        tap({
          next: (user) => {
            if (user) {
              this.localStorage.setItem("currentUser", JSON.stringify(user));
            }
          },
        })
      );
  }

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    if (user) {
      return (
        user.roles.includes(ROLES.MANAGER) || user.roles.includes(ROLES.ADMIN)
      );
    }
    return false;
  }
  getCurrentUser(): ICurrentUser | null {
    return <ICurrentUser>this.localStorage.getItem("currentUser");
  }
  getAccessToken(): string | null {
    return <string>this.localStorage.getItem("accessToken");
  }
  getRefreshToken(): string | null {
    return <string>this.localStorage.getItem("refreshToken");
  }

  setToken(data: {
    accessToken?: string | undefined;
    refreshToken?: string | undefined;
  }): void {
    this.localStorage.setItem("accessToken", JSON.stringify(data?.accessToken));
    this.localStorage.setItem(
      "refreshToken",
      JSON.stringify(data?.refreshToken)
    );
  }
  passwordResetRequest(email: string) {
    return of(true).pipe(delay(1000));
  }

  changePassword(email: string, currentPwd: string, newPwd: string) {
    return of(true).pipe(delay(1000));
  }

  passwordReset(
    email: string,
    token: string,
    password: string,
    confirmPassword: string
  ): any {
    return of(true).pipe(delay(1000));
  }
}
