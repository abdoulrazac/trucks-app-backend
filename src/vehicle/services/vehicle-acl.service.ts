import {Injectable} from '@nestjs/common';

import {ROLE} from '../../shared/constants';
import {BaseAclService} from '../../shared/acl/acl.service';
import {Action} from '../../shared/acl/action.constant';
import {Vehicle} from '../entities/vehicle.entity';

@Injectable()
export class VehicleAclService extends BaseAclService<Vehicle> {
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
