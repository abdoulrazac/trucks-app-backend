import { ROLES } from "../constants";

export class IUser {
  id?: string;
  name?: string;
  username?: string;
  status?: string;
  numTel?: string;
  roles?: ROLES[];
  email?: string;
  isAccountDisabled?: boolean;
  isAssigned?: true;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
  password?: string;
}
