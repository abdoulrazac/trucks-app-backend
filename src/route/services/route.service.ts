import {BadRequestException, Injectable, NotAcceptableException, UnauthorizedException,} from '@nestjs/common';
import {plainToInstance} from 'class-transformer';

import {Action} from '../../shared/acl/action.constant';
import {Actor} from '../../shared/acl/actor.constant';
import {orderClean, whereClauseClean} from '../../shared/helpers';
import {AppLogger} from '../../shared/logger/logger.service';
import {RequestContext} from '../../shared/request-context/request-context.dto';
import {RouteCreateDto} from '../dtos/route-create.dto';
import {RouteOrderDto} from '../dtos/route-order.dto';
import {RouteOutputDto} from '../dtos/route-output.dto';
import {RouteParamDto} from '../dtos/route-param.dto';
import {RouteUpdateDto} from '../dtos/route-update.dto';
import {Route} from '../entities/route.entity';
import {RouteRepository} from '../repositories/route.repository';
import {RouteAclService} from './route-acl.service'; 

@Injectable()
export class RouteService {
  constructor(
    private repository: RouteRepository, 
    private aclService: RouteAclService,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(RouteService.name);
  }

  async getRoutes(
    ctx: RequestContext,
    filters: RouteParamDto,
    order: RouteOrderDto,
    limit: number,
    offset: number,
  ): Promise<{ routes: RouteOutputDto[]; count: number }> {
    this.logger.log(ctx, `${this.getRoutes.name} was called`);

    const actor: Actor = ctx.user;

    const isAllowed = this.aclService.forActor(actor).canDoAction(Action.List);
    if (!isAllowed) {
      throw new UnauthorizedException();
    }

    this.logger.log(ctx, `calling ${RouteRepository.name}.findAndCount`);
    const [routes, count] = await this.repository.findAndCount({
      where: whereClauseClean(filters),
      order: orderClean(order),
      take: limit,
      skip: offset,
    });

    const routesOutput = plainToInstance(RouteOutputDto, routes, {
      excludeExtraneousValues: true,
    });

    return { routes: routesOutput, count };
  }

  async createRoute(
    ctx: RequestContext,
    input: RouteCreateDto,
  ): Promise<RouteOutputDto> {
    this.logger.log(ctx, `${this.createRoute.name} was called`);

    const route = plainToInstance(Route, input);

    const actor: Actor = ctx.user;

    const isAllowed = this.aclService
      .forActor(actor)
      .canDoAction(Action.Create, route);
    if (!isAllowed) {
      throw new UnauthorizedException();
    }

    this.logger.log(ctx, `calling ${RouteRepository.name}.save`);
    const savedRoute = await this.repository.save(route); 

    this.logger.log(ctx, `calling ${RouteRepository.name}.getById`);
    const routeOutput = await this.repository.getById(savedRoute.id);


    return plainToInstance(RouteOutputDto, routeOutput, {
      excludeExtraneousValues: true,
    });
  }

  async getRouteById(
    ctx: RequestContext,
    id: number,
  ): Promise<RouteOutputDto> {
    this.logger.log(ctx, `${this.getRouteById.name} was called`);

    const actor: Actor = ctx.user;

    this.logger.log(ctx, `calling ${RouteRepository.name}.getById`);
    const route = await this.repository.getById(id);

    const isAllowed = this.aclService
      .forActor(actor)
      .canDoAction(Action.Read, route);
    if (!isAllowed) {
      throw new UnauthorizedException();
    }

    return plainToInstance(RouteOutputDto, route, {
      excludeExtraneousValues: true,
    });
  }

  async updateRoute(
    ctx: RequestContext,
    routeId: number,
    input: RouteUpdateDto,
  ): Promise<RouteOutputDto> {
    this.logger.log(ctx, `${this.updateRoute.name} was called`);

    this.logger.log(ctx, `calling ${RouteRepository.name}.getById`);
    const route = await this.repository.getById(routeId);

    const actor: Actor = ctx.user;

    const isAllowed = this.aclService
      .forActor(actor)
      .canDoAction(Action.Update, route);
    if (!isAllowed) {
      throw new UnauthorizedException();
    }

    const updatedRoute: Route = {
      ...route,
      ...plainToInstance(Route, input),
    };

    this.logger.log(ctx, `calling ${RouteRepository.name}.save`);
    const savedRoute = await this.repository.save(updatedRoute);

    return plainToInstance(RouteOutputDto, savedRoute, {
      excludeExtraneousValues: true,
    });
  }

  async deleteRoute(ctx: RequestContext, id: number): Promise<void> {
    this.logger.log(ctx, `${this.deleteRoute.name} was called`);

    this.logger.log(ctx, `calling ${RouteRepository.name}.getById`);
    const route = await this.repository.getById(id);

    const actor: Actor = ctx.user;

    const isAllowed = this.aclService
      .forActor(actor)
      .canDoAction(Action.Delete, route);
    if (!isAllowed) {
      throw new UnauthorizedException();
    }

    this.logger.log(ctx, `calling ${RouteRepository.name}.remove`);
    try {
      await this.repository.remove(route);
    } catch (err) {
      throw new NotAcceptableException(
        'Cannot delete a parent : a forein key constraint',
      );
    }
  }
}
