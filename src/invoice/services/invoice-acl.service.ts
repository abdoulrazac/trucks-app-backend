import { Injectable } from '@nestjs/common';

import { BaseAclService } from '../../shared/acl/acl.service';
import { Action } from '../../shared/acl/action.constant';
import { ROLE } from '../../shared/constants';
import { Invoice } from '../entities/invoice.entity';

@Injectable()
export class InvoiceAclService extends BaseAclService<Invoice> {
  constructor() {
    super();
    // Admin can do all action
    this.canDo(ROLE.ADMIN, [Action.Manage]);
    this.canDo(ROLE.MANAGER, [Action.Read, Action.List]);

    //user can read himself or any other user
    this.canDo(ROLE.ACCOUNTANT, [Action.Manage]);
  }
}
