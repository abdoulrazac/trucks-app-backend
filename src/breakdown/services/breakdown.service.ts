import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { REFERENCE_TYPE } from 'src/shared/constants';
import { nextReference } from 'src/shared/helpers/reference-generator';

import { Action } from '../../shared/acl/action.constant';
import { Actor } from '../../shared/acl/actor.constant';
import { orderClean, whereClauseClean } from '../../shared/helpers';
import { AppLogger } from '../../shared/logger/logger.service';
import { RequestContext } from '../../shared/request-context/request-context.dto';
import { Vehicle } from '../../vehicle/entities/vehicle.entity';
import { VehicleService } from '../../vehicle/services/vehicle.service';
import { BreakdownCreateDto } from '../dtos/breakdown-create.dto';
import { BreakdownOrderDto } from '../dtos/breakdown-order.dto';
import { BreakdownOutputDto } from '../dtos/breakdown-output.dto';
import { BreakdownParamDto } from '../dtos/breakdown-param.dto';
import { BreakdownUpdateDto } from '../dtos/breakdown-update.dto';
import { Breakdown} from '../entities/breakdown.entity';
import { BreakdownRepository } from '../repositories/breakdown.repository';
import { BreakdownAclService } from './breakdown-acl.service';

@Injectable()
export class BreakdownService {
  constructor(
    private repository: BreakdownRepository,
    private aclService: BreakdownAclService,
    private vehicleService: VehicleService,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(BreakdownService.name);
  }

  async getBreakdowns(
    ctx: RequestContext,
    filters: BreakdownParamDto,
    order: BreakdownOrderDto,
    limit: number,
    offset: number,
  ): Promise<{ breakdowns: BreakdownOutputDto[]; count: number }> {
    this.logger.log(ctx, `${this.getBreakdowns.name} was called`);

    const actor: Actor = ctx.user;

    const isAllowed = this.aclService.forActor(actor).canDoAction(Action.List);
    if (!isAllowed) {
      throw new UnauthorizedException();
    }

    this.logger.log(ctx, `calling ${BreakdownRepository.name}.findAndCount`);
    const [breakdowns, count] = await this.repository.findAndCount({
      where: whereClauseClean(filters),
      order: orderClean(order),
      relations: {
        vehicle: true,
      },
      take: limit,
      skip: offset,
    });

    const breakdownsOutput = plainToInstance(BreakdownOutputDto, breakdowns, {
      excludeExtraneousValues: true,
    });

    return { breakdowns: breakdownsOutput, count };
  }

  async createBreakdown(
    ctx: RequestContext,
    input: BreakdownCreateDto,
  ): Promise<BreakdownOutputDto> {
    this.logger.log(ctx, `${this.createBreakdown.name} was called`);

    const breakdown= plainToInstance(Breakdown, input);

    const actor: Actor = ctx.user;

    const isAllowed = this.aclService
      .forActor(actor)
      .canDoAction(Action.Create, breakdown);
    if (!isAllowed) {
      throw new UnauthorizedException();
    }

    try {
      const vehicle = await this.vehicleService.getVehicleById(ctx, input.vehicleId);
      breakdown.vehicle = plainToInstance(Vehicle, vehicle);
    } catch {
      throw new NotFoundException(
        `Author with ID '${input.vehicleId}'  Not Found`,
      );
    }

    // get last breakdown to generate the next reference
    const lastBreakdown = await this.repository.find({ order: { id: 'DESC' }, take: 1});
    breakdown.refBreakdown = nextReference(REFERENCE_TYPE.BREAKDOWN, lastBreakdown[0]?.refBreakdown)

    this.logger.log(ctx, `calling ${BreakdownRepository.name}.save`);
    const savedBreakdown= await this.repository.save(breakdown);

    return plainToInstance(BreakdownOutputDto, savedBreakdown, {
      excludeExtraneousValues: true,
    });
  }

  async getBreakdownById(
    ctx: RequestContext,
    id: number,
  ): Promise<BreakdownOutputDto> {
    this.logger.log(ctx, `${this.getBreakdownById.name} was called`);

    const actor: Actor = ctx.user;

    this.logger.log(ctx, `calling ${BreakdownRepository.name}.getById`);
    const breakdown= await this.repository.getById(id);

    const isAllowed = this.aclService
      .forActor(actor)
      .canDoAction(Action.Read, breakdown);
    if (!isAllowed) {
      throw new UnauthorizedException();
    }

    return plainToInstance(BreakdownOutputDto, breakdown, {
      excludeExtraneousValues: true,
    });
  }

  async updateBreakdown(
    ctx: RequestContext,
    breakdownId: number,
    input: BreakdownUpdateDto,
  ): Promise<BreakdownOutputDto> {
    this.logger.log(ctx, `${this.updateBreakdown.name} was called`);

    this.logger.log(ctx, `calling ${BreakdownRepository.name}.getById`);
    const breakdown= await this.repository.getById(breakdownId);

    const actor: Actor = ctx.user;

    const isAllowed = this.aclService
      .forActor(actor)
      .canDoAction(Action.Update, breakdown);
    if (!isAllowed) {
      throw new UnauthorizedException();
    }

    if (input.vehicleId) {
      try {
        const vehicle = await this.vehicleService.getVehicleById(ctx, input.vehicleId);
        breakdown.vehicle = plainToInstance(Vehicle, vehicle);
      } catch {
        throw new NotFoundException(
          `Author with ID '${input.vehicleId}'  Not Found`,
        );
      }
    }

    const updatedBreakdown: Breakdown= {
      ...breakdown,
      ...plainToInstance(Breakdown, input),
    };

    this.logger.log(ctx, `calling ${BreakdownRepository.name}.save`);
    const savedBreakdown= await this.repository.save(updatedBreakdown);

    return plainToInstance(BreakdownOutputDto, savedBreakdown, {
      excludeExtraneousValues: true,
    });
  }

  async deleteBreakdown(ctx: RequestContext, id: number): Promise<void> {
    this.logger.log(ctx, `${this.deleteBreakdown.name} was called`);

    this.logger.log(ctx, `calling ${BreakdownRepository.name}.getById`);
    const breakdown= await this.repository.getById(id);

    const actor: Actor = ctx.user;

    const isAllowed = this.aclService
      .forActor(actor)
      .canDoAction(Action.Delete, breakdown);
    if (!isAllowed) {
      throw new UnauthorizedException();
    }

    this.logger.log(ctx, `calling ${BreakdownRepository.name}.remove`);
    try {
      await this.repository.remove(breakdown);
    } catch (err) {
      throw new NotAcceptableException(
        'Cannot delete a parent : a forein key constraint',
      );
    }
  }
}
