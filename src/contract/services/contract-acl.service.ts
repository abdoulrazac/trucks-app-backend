import { Injectable } from '@nestjs/common';

import { BaseAclService } from '../../shared/acl/acl.service';
import { Action } from '../../shared/acl/action.constant';
import { Actor } from '../../shared/acl/actor.constant';
import { ROLE } from '../../shared/constants';
import { Contract } from '../entities/contract.entity';

@Injectable()
export class ContractAclService extends BaseAclService<Contract> {
  constructor() {
    super();
    // Admin can do all action
    this.canDo(ROLE.ADMIN, [Action.Manage]);
    this.canDo(ROLE.MANAGER, [Action.Manage]);
    this.canDo(ROLE.ACCOUNTANT, [Action.List, Action.Read]);

    
    this.canDo(ROLE.CONDUCTOR, [Action.Read], this.isUserItself);
    
  }

  isUserItself(resource: Contract, actor: Actor): boolean {
    return resource.author.id === actor.id;
  }
}
