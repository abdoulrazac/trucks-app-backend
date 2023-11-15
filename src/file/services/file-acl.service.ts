import { Injectable } from '@nestjs/common';

import { ROLE } from '../../shared/constants';
import { BaseAclService } from '../../shared/acl/acl.service';
import { Action } from '../../shared/acl/action.constant';
import { File } from '../entities/file.entity';

@Injectable()
export class FileAclService extends BaseAclService<File> {
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
