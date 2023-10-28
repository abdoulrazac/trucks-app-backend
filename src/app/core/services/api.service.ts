import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { IApiResponse } from 'src/app/models/interfaces';
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiService { 

  BASE_URL : string = environment.baseUrl;

  constructor() {  }
  handleError(err : HttpErrorResponse) : Observable<IApiResponse<any>> {
    return throwError( () => err.error)
  }
}
