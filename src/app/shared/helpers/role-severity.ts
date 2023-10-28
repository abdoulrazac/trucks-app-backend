import { ROLES } from "../../models/constants";

export function roleSeverity(role: string): string {
  switch (role.toUpperCase()) {
    case ROLES.CONDUCTOR:
      return "success";
    case ROLES.ACCOUNTANT:
      return "warning";
    case ROLES.MANAGER:
      return "danger";
    case ROLES.ADMIN:
      return "danger";
  }
  return "success";
}
