import {
  Injectable,
  NotAcceptableException,
  UnauthorizedException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { Company } from '../../company/entities/company.entity';
import { CompanyService } from '../../company/services/company.service';
import { InvoiceService } from '../../invoice/services/invoice.service';
import { Action } from '../../shared/acl/action.constant';
import { Actor } from '../../shared/acl/actor.constant';
import { orderClean, whereClauseClean } from '../../shared/helpers';
import { AppLogger } from '../../shared/logger/logger.service';
import { RequestContext } from '../../shared/request-context/request-context.dto';
import { Truck } from '../../truck/entities/truck.entity';
import { TruckService } from '../../truck/services/truck.service';
import { TravelCreateDto } from '../dtos/travel-create.dto';
import { TravelOrderDto } from '../dtos/travel-order.dto';
import { TravelParamDto } from '../dtos/travel-param.dto';
import { Travel } from '../entities/travel.entity';
import { TravelRepository } from '../repositories/travel.repository';
import { TravelAclService } from './travel-acl.service';
import { TravelOutputDto } from '../dtos/travel-output.dto';
import { TravelUpdateDto } from '../dtos/travel-update.dto';

@Injectable()
export class TravelService {
  constructor(
    private repository: TravelRepository,
    private aclService: TravelAclService,
    private truckService: TruckService,
    private companyService: CompanyService,
    private invoiceService: InvoiceService,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(TravelService.name);
  }

  async getTravels(
    ctx: RequestContext,
    filters: TravelParamDto,
    order: TravelOrderDto,
    limit: number,
    offset: number,
  ): Promise<{ travels: TravelOutputDto[]; count: number }> {
    this.logger.log(ctx, `${this.getTravels.name} was called`);

    const actor: Actor = ctx.user;

    const isAllowed = this.aclService.forActor(actor).canDoAction(Action.List);
    if (!isAllowed) {
      throw new UnauthorizedException();
    }

    this.logger.log(ctx, `calling ${TravelRepository.name}.findAndCount`);
    const [travels, count] = await this.repository.findAndCount({
      where: whereClauseClean(filters),
      order: orderClean(order),
      relations: {
        company: true,
        truck: true,
        invoice: true,
      },
      take: limit,
      skip: offset,
    });

    const travelsOutput = plainToInstance(TravelOutputDto, travels, {
      excludeExtraneousValues: true,
    });

    return { travels: travelsOutput, count };
  }

  async createTravel(
    ctx: RequestContext,
    input: TravelCreateDto,
  ): Promise<TravelOutputDto> {
    this.logger.log(ctx, `${this.createTravel.name} was called`);

    const travel = plainToInstance(Travel, input);

    const actor: Actor = ctx.user;

    const isAllowed = this.aclService
      .forActor(actor)
      .canDoAction(Action.Create, travel);
    if (!isAllowed) {
      throw new UnauthorizedException();
    }

    // Errors array
    const errorMessages: string[] = [];

    // Company controls
    try {
      const company = await this.companyService.getCompanyById(
        ctx,
        input.companyId,
      );
      travel.company = plainToInstance(Company, company);
    } catch {
      errorMessages.push(`Company with ID '${input.companyId}'  Not Found`);
    }

    // Truck controls
    try {
      const truck = await this.truckService.getTruckById(ctx, input.truckId);
      travel.truck = plainToInstance(Truck, truck);
    } catch {
      errorMessages.push(`Truck with ID '${input.truckId}'  Not Found`);
    }

    if (errorMessages.length != 0) {
      throw new NotAcceptableException(errorMessages);
    }

    this.logger.log(ctx, `calling ${TravelRepository.name}.save`);
    const savedTravel = await this.repository.save(travel);

    return plainToInstance(TravelOutputDto, savedTravel, {
      excludeExtraneousValues: true,
    });
  }

  async getTravelById(
    ctx: RequestContext,
    id: number,
  ): Promise<TravelOutputDto> {
    this.logger.log(ctx, `${this.getTravelById.name} was called`);

    const actor: Actor = ctx.user;

    this.logger.log(ctx, `calling ${TravelRepository.name}.getById`);
    const travel = await this.repository.getById(id);

    const isAllowed = this.aclService
      .forActor(actor)
      .canDoAction(Action.Read, travel);
    if (!isAllowed) {
      throw new UnauthorizedException();
    }

    return plainToInstance(TravelOutputDto, travel, {
      excludeExtraneousValues: true,
    });
  }
  async updateTravel(
    ctx: RequestContext,
    travelId: number,
    input: TravelUpdateDto,
  ): Promise<TravelOutputDto> {
    this.logger.log(ctx, `${this.updateTravel.name} was called`);

    this.logger.log(ctx, `calling ${TravelRepository.name}.getById`);
    const travel = await this.repository.getById(travelId);

    const actor: Actor = ctx.user;

    const isAllowed = this.aclService
      .forActor(actor)
      .canDoAction(Action.Update, travel);
    if (!isAllowed) {
      throw new UnauthorizedException();
    }

    const updatedTravel: Travel = {
      ...travel,
      ...plainToInstance(Travel, input),
    };

    this.logger.log(ctx, `calling ${TravelRepository.name}.save`);
    const savedTravel = await this.repository.save(updatedTravel);

    return plainToInstance(TravelOutputDto, savedTravel, {
      excludeExtraneousValues: true,
    });
  }

  async deleteTravel(ctx: RequestContext, id: number): Promise<void> {
    this.logger.log(ctx, `${this.deleteTravel.name} was called`);

    this.logger.log(ctx, `calling ${TravelRepository.name}.getById`);
    const travel = await this.repository.getById(id);

    const actor: Actor = ctx.user;

    const isAllowed = this.aclService
      .forActor(actor)
      .canDoAction(Action.Delete, travel);
    if (!isAllowed) {
      throw new UnauthorizedException();
    }

    this.logger.log(ctx, `calling ${TravelRepository.name}.remove`);
    try {
      await this.repository.remove(travel);
    } catch (err) {
      throw new NotAcceptableException(
        'Cannot delete a parent : a forein key constraint',
      );
    }
  }
}
