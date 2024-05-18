import {Injectable} from '@nestjs/common';

import {BaseAclService} from '../../shared/acl/acl.service';
import {Action} from '../../shared/acl/action.constant';
import {ROLE} from '../../shared/constants';
import {Travel} from '../entities/travel.entity';
import { Actor } from "./../../shared/acl/actor.constant";

@Injectable()
export class TravelAclService extends BaseAclService<Travel> {
  constructor() {
    super();
    // Admin can do all action
    this.canDo(ROLE.ADMIN, [Action.Manage]);
    this.canDo(ROLE.MANAGER, [Action.Manage]);
    this.canDo(ROLE.ACCOUNTANT, [Action.List, Action.Read]);


    //user can read himself or any other user
    this.canDo(ROLE.CONDUCTOR, [Action.Read], this.isItsOwnTravel);
  }

  isItsOwnTravel(travel: Travel, user: Actor): boolean {
    return user.id === travel.truck.conductor.id;
  }
}
