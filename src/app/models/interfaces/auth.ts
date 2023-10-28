import {ROLES} from "../constants";

export interface ILogin {
    email : string;
    password:string;
    rememberMe:boolean;
}

export interface ICurrentUser {
    sub : number
    username : string ;
    roles : ROLES[];
    iat : number;
    exp : number;
}

export interface ILoginResponse  {
    accessToken: string;
    refreshToken: string;
}

export interface IRegister {
    email : string;
    password:string;
    rememberMe:boolean;
}

export interface IResetPassword {
    email : string;
}

export interface ISelect {
    name: string;
    code: string;
}

export interface IActivateAccount {
    email: string;
    code: string;
}