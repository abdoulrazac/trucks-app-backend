import { Injectable } from '@nestjs/common';

import { BaseAclService } from '../../shared/acl/acl.service';
import { Action } from '../../shared/acl/action.constant';
import { Actor } from '../../shared/acl/actor.constant';
import { ROLE } from '../../shared/constants';
import { User } from '../entities/user.entity';

@Injectable()
export class UserAclService extends BaseAclService<User> {
  constructor() {
    super();

    // user can only update himself
    this.canDo(ROLE.CONDUCTOR, [Action.Read, Action.Update], this.isUserItself);

    //user can read himself or any other user
    this.canDo(ROLE.ACCOUNTANT, [Action.Update], this.isUserItself);
    this.canDo(ROLE.ACCOUNTANT, [Action.Read, Action.List]);

    // Admin can do all action
    this.canDo(ROLE.ADMIN, [Action.Manage]);
    this.canDo(ROLE.MANAGER, [Action.Manage]);
  }

  isUserItself(resource: User, actor: Actor): boolean {
    return resource.id === actor.id;
  }
}
