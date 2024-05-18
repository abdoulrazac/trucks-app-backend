import { Injectable } from '@nestjs/common';

import { BaseAclService } from '../../shared/acl/acl.service';
import { Action } from '../../shared/acl/action.constant';
import { ROLE } from '../../shared/constants';
import { Breakdown} from '../entities/breakdown.entity';

@Injectable()
export class BreakdownAclService extends BaseAclService<Breakdown> {
  constructor() {
    super();
    // Admin can do all action
    this.canDo(ROLE.ADMIN, [Action.Manage]);
    this.canDo(ROLE.MANAGER, [Action.Manage]);
    this.canDo(ROLE.ACCOUNTANT, [Action.List, Action.Read]);

    //user can read himself or any other user
    this.canDo(ROLE.CONDUCTOR, [Action.Read, Action.List, Action.Create]);
  }
}
