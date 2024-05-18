import { Injectable } from '@nestjs/common';

import { BaseAclService } from '../../shared/acl/acl.service';
import { Action } from '../../shared/acl/action.constant';
import { ROLE } from '../../shared/constants';
import { File } from '../entities/file.entity';
import { Actor } from "./../../shared/acl/actor.constant";

@Injectable()
export class FileAclService extends BaseAclService<File> {
  constructor() {
    super();
    // Admin can do all action
    this.canDo(ROLE.ADMIN, [Action.Manage]);
    this.canDo(ROLE.MANAGER, [Action.Manage]);
    this.canDo(ROLE.ACCOUNTANT, [Action.Create, Action.List, Action.Read, Action.Update]);

    //user can read himself or any other user
    this.canDo(ROLE.CONDUCTOR, [Action.Read]);
    
    // user can only update himself
    this.canDo(ROLE.CONDUCTOR, [Action.Update]);
  }
  
  isUserItself(resource: File, actor: Actor): boolean {
    return resource.author.id === actor.id;
  }
}