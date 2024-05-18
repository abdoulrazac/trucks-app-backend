import {Injectable} from '@nestjs/common';

import {BaseAclService} from '../../shared/acl/acl.service';
import {Action} from '../../shared/acl/action.constant';
import {ROLE} from '../../shared/constants';
import {FinancialCategory} from '../entities/financial-category.entity';

@Injectable()
export class FinancialCategoryAclService extends BaseAclService<FinancialCategory> {
  constructor() {
    super();
    // Admin can do all action
    this.canDo(ROLE.ADMIN, [Action.Manage]);
    this.canDo(ROLE.MANAGER, [Action.Manage]);
    this.canDo(ROLE.ACCOUNTANT, [Action.Read, Action.List]);

    // user can read himself or any other user
    this.canDo(ROLE.CONDUCTOR, [Action.Read, Action.List]);
  }
}
