import { Injectable } from '@nestjs/common';

import { ROLE } from '../../shared/constants';
import { BaseAclService } from '../../shared/acl/acl.service';
import { Action } from '../../shared/acl/action.constant';
import { Company } from '../entities/company.entity';

@Injectable()
export class CompanyAclService extends BaseAclService<Company> {
  constructor() {
    super();
    // Admin can do all action
    this.canDo(ROLE.ADMIN, [Action.Manage]);
    this.canDo(ROLE.MANAGER, [Action.Manage]);

    // user can only update himself
    this.canDo(ROLE.ACCOUNTANT, [Action.Read, Action.List]);

    //user can read himself or any other user
    this.canDo(ROLE.CONDUCTOR, []);
  }
}
