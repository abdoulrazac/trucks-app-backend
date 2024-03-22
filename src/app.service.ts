import { Injectable } from '@nestjs/common';

import { AppLogger } from './shared/logger/logger.service';
import { RequestContext } from './shared/request-context/request-context.dto';

@Injectable()
export class AppService {
  constructor(private readonly logger: AppLogger) {
    this.logger.setContext(AppService.name);
  }

  getHello(ctx: RequestContext): any {
    this.logger.log(ctx, 'Hello world from App service');

    // return description this API and docs link
    return {
      description: 'API for the management of a transport company',
      docs : '/api/docs'
    };
  }
}
