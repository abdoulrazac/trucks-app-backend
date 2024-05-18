import {Injectable} from '@nestjs/common';

import {BaseAclService} from '../../shared/acl/acl.service';
import {Action} from '../../shared/acl/action.constant';
import {ROLE} from '../../shared/constants';
import {Truck} from '../entities/truck.entity';
import { Actor } from "./../../shared/acl/actor.constant";

@Injectable()
export class TruckAclService extends BaseAclService<Truck> {
  constructor() {
    super();
    // Admin can do all action
    this.canDo(ROLE.ADMIN, [Action.Manage]);
    this.canDo(ROLE.MANAGER, [Action.Manage]);

    //user can read himself or any other user
    this.canDo(ROLE.ACCOUNTANT, [Action.Read, Action.List]);
    this.canDo(ROLE.CONDUCTOR, [Action.Read], this.isOwner);
    // user can only update himself
    this.canDo(ROLE.CONDUCTOR, [Action.Update]);
  }

  isOwner( truck: Truck, user : Actor): boolean {
    return truck.conductor.id === user.id;
  }
}
