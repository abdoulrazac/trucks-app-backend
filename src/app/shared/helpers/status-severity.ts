import { ACCOUNT_STATUS } from "../../models/constants";

export function statusSeverity(status: string): string {
  switch (status.toUpperCase()) {
    case ACCOUNT_STATUS.AVAILABLE:
      return "success";
    case ACCOUNT_STATUS.WORK:
      return "warning";
    case ACCOUNT_STATUS.NO_CONTRACT:
      return "danger";
    case ACCOUNT_STATUS.VACANCY:
      return "success";
  }
  return "success";
}
