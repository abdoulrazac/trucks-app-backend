import {Injectable} from '@nestjs/common';

import {BaseAclService} from '../../shared/acl/acl.service';
import {Action} from '../../shared/acl/action.constant';
import {ROLE} from '../../shared/constants';
import {Dashboard} from '../entities/dashboard.entity';

@Injectable()
export class DashboardAclService extends BaseAclService<Dashboard> {
  constructor() {
    super();
    // Admin can do all action
    this.canDo(ROLE.ADMIN, [Action.Manage]);
    this.canDo(ROLE.MANAGER, [Action.Manage]);

    // user can read himself or any other user
    this.canDo(ROLE.ACCOUNTANT, [Action.Read, Action.List]);
  }
}
