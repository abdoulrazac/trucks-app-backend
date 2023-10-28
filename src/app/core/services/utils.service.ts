import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, delay, map, tap } from 'rxjs/operators';

import { of, Observable } from 'rxjs';
import { ApiService } from './api.service';
import { StorageService } from './storage.service';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { FilterService } from 'primeng/api';
import { ISelect } from 'src/app/models/interfaces';

@Injectable({
    providedIn: 'root'
})
export class UtilsService { 

    fullList : ISelect[] = [{
      name: "Russia",
      code: "RU"
    }, {
      name: "Nigeria",
      code: "NG"
    }, {
      name: "China",
      code: "CN"
    }, {
      name: "Finland",
      code: "FI"
    }, {
      name: "China",
      code: "CN"
    }, {
      name: "Burkina Faso",
      code: "BF"
    }, {
      name: "Portugal",
      code: "PT"
    }, {
      name: "Ukraine",
      code: "UA"
    }, {
      name: "Indonesia",
      code: "ID"
    }, {
      name: "France",
      code: "FR"
    }, {
      name: "Portugal",
      code: "PT"
    }, {
      name: "Poland",
      code: "PL"
    }, {
      name: "Niger",
      code: "NE"
    }, {
      name: "China",
      code: "CN"
    }, {
      name: "Bolivia",
      code: "BO"
    }, {
      name: "Mali",
      code: "ML"
    }, {
      name: "Honduras",
      code: "HN"
    }, {
      name: "Brazil",
      code: "BR"
    }, {
      name: "Brazil",
      code: "BR"
    }, {
      name: "Indonesia",
      code: "ID"
    }]

    constructor(
        private http: HttpClient,
        private api: ApiService, 
        private filterService : FilterService
    ) { }


    uniqueEmailValidator(): AsyncValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
        //   return  this.http
        //   .get(`${this.api.BASE_URL}/auth/check-email-exist`)
        //   .pipe(
        //     map((value) => (value ? { emailExists: true } : null))
        //   );
            return  of(null).pipe(delay(500));
        };
    } 

    getFieldList(term : string): Observable<any> { 
        let list :any[] = [];  
        for (let i = 0; i < this.fullList.length; i++) {
            let field = this.fullList[i]
            if (this.filterService.filters.contains(field.name.toLowerCase(), term))
            list.push(field); 
        }
        return of(list).pipe(delay(500));
    }

    getCountryList(term : string): Observable<any> { 
        let list :any[] = []; 
        for (let i = 0; i < this.fullList.length; i++) {
            let field = this.fullList[i]
            if (this.filterService.filters.contains(field.name.toLowerCase(), term))
            list.push(field); 
        }
        return of(list).pipe(delay(500));
    }
}
