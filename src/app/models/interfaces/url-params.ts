export interface IUrlParams<T> {
  pagination?: IPagination;
  filterData?: T;
}
export interface IPagination {
  limit?: number;
  offset?: number;
}
