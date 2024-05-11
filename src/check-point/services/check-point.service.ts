import {BadRequestException, Injectable, NotAcceptableException, UnauthorizedException,} from '@nestjs/common';
import {plainToInstance} from 'class-transformer';

import {Action} from '../../shared/acl/action.constant';
import {Actor} from '../../shared/acl/actor.constant';
import {orderClean, whereClauseClean} from '../../shared/helpers';
import {AppLogger} from '../../shared/logger/logger.service';
import {RequestContext} from '../../shared/request-context/request-context.dto';
import {CheckPointCreateDto} from '../dtos/check-point-create.dto';
import {CheckPointOrderDto} from '../dtos/check-point-order.dto';
import {CheckPointOutputDto} from '../dtos/check-point-output.dto';
import {CheckPointParamDto} from '../dtos/check-point-param.dto';
import {CheckPointUpdateDto} from '../dtos/check-point-update.dto';
import {CheckPoint} from '../entities/check-point.entity';
import {CheckPointRepository} from '../repositories/check-point.repository';
import { Route } from "./../../route/entities/route.entity";
import { RouteRepository } from "./../../route/repositories/route.repository";
import { RouteService } from "./../../route/services/route.service";
import {CheckPointAclService} from './check-point-acl.service'; 

@Injectable()
export class CheckPointService {
  constructor(
    private repository: CheckPointRepository, 
    private aclService: CheckPointAclService,
    private routeService: RouteService,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(CheckPointService.name);
  }

  async getCheckPoints(
    ctx: RequestContext,
    filters: CheckPointParamDto,
    order: CheckPointOrderDto,
    limit: number,
    offset: number,
  ): Promise<{ checkPoints: CheckPointOutputDto[]; count: number }> {
    this.logger.log(ctx, `${this.getCheckPoints.name} was called`);

    const actor: Actor = ctx.user;

    const isAllowed = this.aclService.forActor(actor).canDoAction(Action.List);
    if (!isAllowed) {
      throw new UnauthorizedException();
    }

    this.logger.log(ctx, `calling ${CheckPointRepository.name}.findAndCount`);
    const [checkPoints, count] = await this.repository.findAndCount({
      where: whereClauseClean(filters),
      order: orderClean(order),
      take: limit,
      skip: offset,
    });

    const checkPointsOutput = plainToInstance(CheckPointOutputDto, checkPoints, {
      excludeExtraneousValues: true,
    });

    return { checkPoints: checkPointsOutput, count };
  }

  async createCheckPoint(
    ctx: RequestContext,
    input: CheckPointCreateDto,
  ): Promise<CheckPointOutputDto> {
    this.logger.log(ctx, `${this.createCheckPoint.name} was called`);

    const checkPoint = plainToInstance(CheckPoint, input);

    const actor: Actor = ctx.user;

    const isAllowed = this.aclService
      .forActor(actor)
      .canDoAction(Action.Create, checkPoint);
    if (!isAllowed) {
      throw new UnauthorizedException();
    }

    if (input.routeId) {
      try {
        this.logger.log(ctx, `calling ${RouteService.name}.getById`);
        const route = await this.routeService.getRouteById(ctx, input.routeId);
        checkPoint.route = plainToInstance(Route, route);
      } catch {
        throw new BadRequestException(`CheckPoint route with ID '${input.routeId}' is Not Found`);
      }
    }

    this.logger.log(ctx, `calling ${CheckPointRepository.name}.save`);
    const savedCheckPoint = await this.repository.save(checkPoint); 

    this.logger.log(ctx, `calling ${CheckPointRepository.name}.getById`);
    const checkPointOutput = await this.repository.getById(savedCheckPoint.id);


    return plainToInstance(CheckPointOutputDto, checkPointOutput, {
      excludeExtraneousValues: true,
    });
  }

  async getCheckPointById(
    ctx: RequestContext,
    id: number,
  ): Promise<CheckPointOutputDto> {
    this.logger.log(ctx, `${this.getCheckPointById.name} was called`);

    const actor: Actor = ctx.user;

    this.logger.log(ctx, `calling ${CheckPointRepository.name}.getById`);
    const checkPoint = await this.repository.getById(id);

    const isAllowed = this.aclService
      .forActor(actor)
      .canDoAction(Action.Read, checkPoint);
    if (!isAllowed) {
      throw new UnauthorizedException();
    }

    return plainToInstance(CheckPointOutputDto, checkPoint, {
      excludeExtraneousValues: true,
    });
  }

  async updateCheckPoint(
    ctx: RequestContext,
    checkPointId: number,
    input: CheckPointUpdateDto,
  ): Promise<CheckPointOutputDto> {
    this.logger.log(ctx, `${this.updateCheckPoint.name} was called`);

    this.logger.log(ctx, `calling ${CheckPointRepository.name}.getById`);
    const checkPoint = await this.repository.getById(checkPointId);

    const actor: Actor = ctx.user;

    const isAllowed = this.aclService
      .forActor(actor)
      .canDoAction(Action.Update, checkPoint);
    if (!isAllowed) {
      throw new UnauthorizedException();
    }

    if(input.routeId){
      try {
        this.logger.log(ctx, `calling ${RouteService.name}.getById`);
        const route = await this.routeService.getRouteById(ctx, input.routeId);
        checkPoint.route = plainToInstance(Route, route);
      } catch {
        throw new BadRequestException(`CheckPoint route with ID '${input.routeId}' is Not Found`);
      }
    }

    const updatedCheckPoint: CheckPoint = {
      ...checkPoint,
      ...plainToInstance(CheckPoint, input),
    };

    this.logger.log(ctx, `calling ${CheckPointRepository.name}.save`);
    const savedCheckPoint = await this.repository.save(updatedCheckPoint);

    return plainToInstance(CheckPointOutputDto, savedCheckPoint, {
      excludeExtraneousValues: true,
    });
  }

  async deleteCheckPoint(ctx: RequestContext, id: number): Promise<void> {
    this.logger.log(ctx, `${this.deleteCheckPoint.name} was called`);

    this.logger.log(ctx, `calling ${CheckPointRepository.name}.getById`);
    const checkPoint = await this.repository.getById(id);

    const actor: Actor = ctx.user;

    const isAllowed = this.aclService
      .forActor(actor)
      .canDoAction(Action.Delete, checkPoint);
    if (!isAllowed) {
      throw new UnauthorizedException();
    }

    this.logger.log(ctx, `calling ${CheckPointRepository.name}.remove`);
    try {
      await this.repository.remove(checkPoint);
    } catch (err) {
      throw new NotAcceptableException(
        'Cannot delete a parent : a forein key constraint',
      );
    }
  }
}
