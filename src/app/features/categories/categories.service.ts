import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "src/app/core/services/api.service";
import { IApiResponse, ICategory, IUrlParams } from "src/app/models/interfaces";
import {
  API_CATEGORY_CREATE,
  API_CATEGORY_LIST,
  API_CATEGORY_READ,
  API_CATEGORY_UPDATE,
  API_CATEGORY_DELETE,
} from "../../models/app-path";

@Injectable({
  providedIn: "root",
})
export class CategoriesService {
  constructor(private http: HttpClient, private api: ApiService) {}

  getList(
    params: IUrlParams<ICategory>
  ): Observable<IApiResponse<ICategory[]>> {
    const { pagination, filterData } = params;
    return this.http.get<IApiResponse<ICategory[]>>(API_CATEGORY_LIST, {
      params: { ...pagination, ...filterData },
    });
  }

  create(category: ICategory): Observable<IApiResponse<ICategory>> {
    return this.http.post<IApiResponse<ICategory>>(
      API_CATEGORY_CREATE,
      category
    );
  }
  update(id: number, category: ICategory): Observable<IApiResponse<ICategory>> {
    return this.http.put<IApiResponse<ICategory>>(
      `${API_CATEGORY_UPDATE}/${id}`,
      category
    );
  }
  getById(id: number): Observable<IApiResponse<ICategory>> {
    return this.http.get<IApiResponse<ICategory>>(`${API_CATEGORY_READ}/${id}`);
  }
  deleteById(id: number): Observable<IApiResponse<ICategory>> {
    return this.http.delete<IApiResponse<ICategory>>(
      `${API_CATEGORY_DELETE}/${id}`
    );
  }
}
