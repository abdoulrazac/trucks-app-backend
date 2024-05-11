import {Injectable} from '@nestjs/common';

import {ROLE} from '../../shared/constants';
import {BaseAclService} from '../../shared/acl/acl.service';
import {Action} from '../../shared/acl/action.constant';
import {TravelCheckPoint} from '../entities/travel-check-point.entity';

@Injectable()
export class TravelCheckPointAclService extends BaseAclService<TravelCheckPoint> {
  constructor() {
    super();
    // Admin can do all action
    this.canDo(ROLE.ADMIN, [Action.Manage]);
    this.canDo(ROLE.MANAGER, [Action.Manage]);

    // user can read himself or any other user
    this.canDo(ROLE.CONDUCTOR, [Action.Read, Action.List]);
    this.canDo(ROLE.ACCOUNTANT, [Action.Read, Action.List]);
  }
}
