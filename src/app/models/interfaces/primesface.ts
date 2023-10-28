export interface IPaginator {
  first: number;
  page: number;
  pageCount: number;
  rows: number;
}

export interface ISort {
  field: string;
  order: number;
}

export interface IMenuItem {
  label?: string;
  items?: IMenuItem[];
  value?: string | number;
  icon?: string;
  routerLink?: string[];
}
