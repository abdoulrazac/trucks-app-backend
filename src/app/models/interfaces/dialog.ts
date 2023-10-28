export interface IDialog<T> {
  isNew?: boolean;
  isNewPassword?: boolean;
  save?: boolean;
  data: T;
}
