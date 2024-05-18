import { Injectable } from '@nestjs/common';

import { BaseAclService } from '../../shared/acl/acl.service';
import { Action } from '../../shared/acl/action.constant';
import { ROLE } from '../../shared/constants';
import { Finance } from '../entities/finance.entity';

@Injectable()
export class FinanceAclService extends BaseAclService<Finance> {
  constructor() {
    super();
    // Admin can do all action
    this.canDo(ROLE.ADMIN, [Action.Manage]);
    this.canDo(ROLE.MANAGER, [Action.List, Action.Read]);
    this.canDo(ROLE.ACCOUNTANT, [Action.Manage]);

    //user can read himself or any other user
    this.canDo(ROLE.CONDUCTOR, [Action.Read]);
    // user can only update himself
    this.canDo(ROLE.CONDUCTOR, [Action.Update]);
  }
}
