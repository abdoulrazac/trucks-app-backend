import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
  UnauthorizedException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Travel } from 'src/travel/entities/travel.entity';

import { Action } from '../../shared/acl/action.constant';
import { Actor } from '../../shared/acl/actor.constant';
import { orderClean, whereClauseClean } from '../../shared/helpers';
import { AppLogger } from '../../shared/logger/logger.service';
import { RequestContext } from '../../shared/request-context/request-context.dto';
import { TravelCheckPointCreateDto } from '../dtos/travel-check-point-create.dto';
import { TravelCheckPointOrderDto } from '../dtos/travel-check-point-order.dto';
import { TravelCheckPointOutputDto } from '../dtos/travel-check-point-output.dto';
import { TravelCheckPointParamDto } from '../dtos/travel-check-point-param.dto';
import { TravelCheckPointUpdateDto } from '../dtos/travel-check-point-update.dto';
import { TravelCheckPoint } from '../entities/travel-check-point.entity';
import { TravelCheckPointRepository } from '../repositories/travel-check-point.repository';
import { CheckPoint } from './../../check-point/entities/check-point.entity';
import { CheckPointService } from './../../check-point/services/check-point.service';
import { TravelService } from './../../travel/services/travel.service';
import { TravelCheckPointAclService } from './travel-check-point-acl.service';

@Injectable()
export class TravelCheckPointService {
  constructor(
    private repository: TravelCheckPointRepository,
    private aclService: TravelCheckPointAclService,
    private checkPointService: CheckPointService,
    private travelService: TravelService,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(TravelCheckPointService.name);
  }

  async getTravelCheckPoints(
    ctx: RequestContext,
    filters: TravelCheckPointParamDto,
    order: TravelCheckPointOrderDto,
    limit: number,
    offset: number,
  ): Promise<{
    travelCheckPoints: TravelCheckPointOutputDto[];
    count: number;
  }> {
    this.logger.log(ctx, `${this.getTravelCheckPoints.name} was called`);

    const actor: Actor = ctx.user;

    const isAllowed = this.aclService.forActor(actor).canDoAction(Action.List);
    if (!isAllowed) {
      throw new UnauthorizedException();
    }

    this.logger.log(
      ctx,
      `calling ${TravelCheckPointRepository.name}.findAndCount`,
    );
    const [travelCheckPoints, count] = await this.repository.findAndCount({
      where: whereClauseClean(filters),
      order: orderClean(order),
      take: limit,
      skip: offset,
    });

    const travelCheckPointsOutput = plainToInstance(
      TravelCheckPointOutputDto,
      travelCheckPoints,
      {
        excludeExtraneousValues: true,
      },
    );

    return { travelCheckPoints: travelCheckPointsOutput, count };
  }

  async saveTravelCheckPoint(
    ctx: RequestContext,
    input: TravelCheckPointCreateDto,
  ): Promise<TravelCheckPointOutputDto> {
    this.logger.log(ctx, `${this.createTravelCheckPoint.name} was called`);

    const travelCheckPoint = plainToInstance(TravelCheckPoint, input);

    const actor: Actor = ctx.user;

    const isAllowed = this.aclService
      .forActor(actor)
      .canDoAction(Action.Create, travelCheckPoint);
    if (!isAllowed) {
      throw new UnauthorizedException();
    }

    if (input.travelId) {
      try {
        this.logger.log(ctx, `calling ${TravelService.name}.getTravelById`);
        const travel = await this.travelService.getTravelById(
          ctx,
          input.travelId,
        );
        travelCheckPoint.travel = plainToInstance(Travel, travel);
      } catch {
        throw new BadRequestException(
          `TravelCheckPoint travel with ID '${input.travelId}' is Not Found`,
        );
      }
    }

    if (input.checkPointId) {
      try {
        this.logger.log(ctx, `calling ${CheckPointService.name}.getById`);
        const checkPoint = await this.checkPointService.getCheckPointById(
          ctx,
          input.checkPointId,
        );
        travelCheckPoint.checkPoint = plainToInstance(CheckPoint, checkPoint);
      } catch {
        throw new BadRequestException(
          `TravelCheckPoint CheckPoint with ID '${input.checkPointId}' is Not Found`,
        );
      }
    }
    

    try {
      this.logger.log(ctx, `calling ${TravelCheckPointRepository.name}.save`);
      const travelCheckPoint = await this.repository.findOne({
        where: {
          travelId: input.travelId,
          checkPointId: input.checkPointId,
        },
      });
      if (travelCheckPoint) {
        throw new BadRequestException('TravelCheckPoint already exists');
      }
    } catch {
      throw new BadRequestException(
        `TravelCheckPoint with travelId '${input.travelId}' and checkPointId '${input.checkPointId}' is Not checkable`,
      );
    }

    this.logger.log(ctx, `calling ${TravelCheckPointRepository.name}.save`);
    const savedTravelCheckPoint = await this.repository.save(travelCheckPoint);

    this.logger.log(ctx, `calling ${TravelCheckPointRepository.name}.getById`);
    const travelCheckPointOutput = await this.repository.findOne({
      where: {
        travelId: savedTravelCheckPoint.travelId,
        checkPointId: savedTravelCheckPoint.checkPointId,
      },
    });

    return plainToInstance(TravelCheckPointOutputDto, travelCheckPointOutput, {
      excludeExtraneousValues: true,
    });
  }

  async deleteTravelCheckPoint(
    ctx: RequestContext,
    travelId: number,
    checkPointId: number,
  ): Promise<void> {
    this.logger.log(ctx, `${this.deleteTravelCheckPoint.name} was called`);

    try {
      this.logger.log(ctx, `calling ${TravelCheckPointRepository.name}.getById`);
      await this.repository.findOne({where: { travelId, checkPointId }});
    } catch {
      throw new BadRequestException(
        `TravelCheckPoint with travelId '${travelId}' and checkPointId '${checkPointId}' is Not Found`,
      );
    }

    const travelCheckPoint = await this.repository.findOne({where: { travelId, checkPointId }});
    const actor: Actor = ctx.user;

    const isAllowed = this.aclService
      .forActor(actor)
      .canDoAction(Action.Delete, travelCheckPoint);
    if (!isAllowed) {
      throw new UnauthorizedException();
    }

    this.logger.log(ctx, `calling ${TravelCheckPointRepository.name}.remove`);
    try {
      await this.repository.remove(travelCheckPoint);
    } catch (err) {
      throw new NotAcceptableException(
        'Cannot delete a parent : a forein key constraint',
      );
    }
  }
}
