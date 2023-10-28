import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "src/app/core/services/api.service";
import {
  IApiResponse,
  IBuffer,
  IUrlParams,
  IUser,
} from "src/app/models/interfaces";
import {
  API_ACCOUNT_CREATE,
  API_ACCOUNT_DELETE,
  API_ACCOUNT_LIST,
  API_ACCOUNT_ME,
  API_ACCOUNT_READ,
  API_ACCOUNT_UPDATE,
} from "../../models/app-path";

@Injectable({
  providedIn: "root",
})
export class AccountsService {
  constructor(private http: HttpClient, private api: ApiService) {}

  getList(params: IUrlParams<IUser>): Observable<IApiResponse<IUser[]>> {
    const { pagination, filterData } = params;
    return this.http.get<IApiResponse<IUser[]>>(API_ACCOUNT_LIST, {
      params: { ...pagination, ...filterData },
    });
  }

  create(user: IUser): Observable<IApiResponse<IUser>> {
    return this.http.post<IApiResponse<IUser>>(API_ACCOUNT_CREATE, user);
  }
  update(id: number, user: IUser | FormData): Observable<IApiResponse<IUser>> {
    return this.http.put<IApiResponse<IUser>>(
      `${API_ACCOUNT_UPDATE}/${id}`,
      user
    );
  }

  getMe(): Observable<IApiResponse<IUser>> {
    return this.http.get<IApiResponse<IUser>>(API_ACCOUNT_ME);
  }

  getById(id: number): Observable<IApiResponse<IUser>> {
    return this.http.get<IApiResponse<IUser>>(`${API_ACCOUNT_READ}/${id}`);
  }

  getAvatarByUserId(id: number): Observable<IApiResponse<IBuffer>> {
    return this.http.get<IApiResponse<IBuffer>>(
      `${API_ACCOUNT_READ}/${id}/avatar`
    );
  }
  deleteById(id: number): Observable<IApiResponse<IUser>> {
    return this.http.delete<IApiResponse<IUser>>(`${API_ACCOUNT_DELETE}/${id}`);
  }
}
