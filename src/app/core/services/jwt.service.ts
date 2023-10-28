import { Injectable } from "@angular/core";
import { ICurrentUser } from "../../models/interfaces";
import jwtDecode, { JwtPayload } from "jwt-decode";

@Injectable({
  providedIn: "root",
})
export class JwtService {
  isExpiredToken(token: string): boolean {
    const { exp } = jwtDecode<JwtPayload>(token);
    return exp ? exp < Date.now() / 1000 : true;
  }

  getExpirationDate(token: string): number {
    const { exp } = jwtDecode<JwtPayload>(token);
    return <number>exp;
  }

  decodeToken(token: string | undefined): ICurrentUser {
    return jwtDecode<ICurrentUser>(<string>token);
  }
}
