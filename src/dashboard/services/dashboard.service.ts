import {Injectable,} from '@nestjs/common';
import {plainToInstance} from 'class-transformer';

import {AppLogger} from '../../shared/logger/logger.service';
import {RequestContext} from '../../shared/request-context/request-context.dto';
import { DashboardStatsOutputDto } from '../dtos/dashboard-stats-output.dto';
import {DashboardRepository} from '../repositories/dashboard.repository';

@Injectable()
export class DashboardService {
  constructor(
    private repository: DashboardRepository, 
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(DashboardService.name);
  }

  async getStatistics(
    ctx: RequestContext,
  ): Promise<DashboardStatsOutputDto> {
    this.logger.log(ctx, `${this.getStatistics.name} was called`);

    this.logger.log(ctx, `calling ${DashboardRepository.name}.getStatistics`);
    const stats = await this.repository.getStatistics();

    return plainToInstance(DashboardStatsOutputDto, stats, {
      excludeExtraneousValues: true,
    });
  }
}
