import { Injectable } from '@nestjs/common';

import { ROLE } from '../../shared/constants';
import { BaseAclService } from '../../shared/acl/acl.service';
import { Action } from '../../shared/acl/action.constant';
import { Actor } from '../../shared/acl/actor.constant';
import { User } from '../../user/entities/user.entity';
import { Invoice } from '../entities/invoice.entity';

@Injectable()
export class InvoiceAclService extends BaseAclService<Invoice> {
  constructor() {
    super();
    // Admin can do all action
    this.canDo(ROLE.ADMIN, [Action.Manage]);
    //user can read himself or any other user
    this.canDo(ROLE.CONDUCTOR, [Action.Read]);
    // user can only update himself
    this.canDo(ROLE.CONDUCTOR, [Action.Update]);
  }
}
