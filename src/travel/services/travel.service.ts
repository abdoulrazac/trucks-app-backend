import {Injectable, NotAcceptableException, UnauthorizedException,} from '@nestjs/common';
import {plainToInstance} from 'class-transformer';

import {Company} from '../../company/entities/company.entity';
import {CompanyService} from '../../company/services/company.service';
import {Action} from '../../shared/acl/action.constant';
import {Actor} from '../../shared/acl/actor.constant';
import {orderClean, whereClauseClean} from '../../shared/helpers';
import {AppLogger} from '../../shared/logger/logger.service';
import {RequestContext} from '../../shared/request-context/request-context.dto';
import {Truck} from '../../truck/entities/truck.entity';
import {TruckService} from '../../truck/services/truck.service';
import {TravelCreateDto} from '../dtos/travel-create.dto';
import {TravelOrderDto} from '../dtos/travel-order.dto';
import {TravelParamDto} from '../dtos/travel-param.dto';
import {Travel} from '../entities/travel.entity';
import {TravelRepository} from '../repositories/travel.repository';
import {TravelAclService} from './travel-acl.service';
import {TravelOutputDto} from '../dtos/travel-output.dto';
import {TravelUpdateDto} from '../dtos/travel-update.dto';
import {TRAVEL_STATUS, VEHICLE_STATUS} from "../../shared/constants";
import {DataSource} from "typeorm";

@Injectable()
export class TravelService {
  constructor(
    private dataSource: DataSource,
    private repository: TravelRepository,
    private aclService: TravelAclService,
    private truckService: TruckService,
    private companyService: CompanyService,
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

    // refTravel controls
    try {
      const travelByRef = await this.repository.findOne({ where : { refTravel : input.refTravel } }); 
      if(travelByRef) {
        errorMessages.push(`Travel with ref '${input.refTravel}' already exists`);
      }
    } catch {
      errorMessages.push(`Cannot check refTravel !`);
    }

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
      if (truck.isClosed) {
        errorMessages.push(`Truck with ID '${input.truckId}' is closed`);
      }
      if (truck.status == VEHICLE_STATUS.WORK){
        errorMessages.push(`Truck with ID '${input.truckId}' is already in a travel`);
      }
      if (truck.status == VEHICLE_STATUS.PANNE){
        errorMessages.push(`Truck with ID '${input.truckId}' is in panne`);
      }
      if (truck.status == VEHICLE_STATUS.GARAGE){
        errorMessages.push(`Truck with ID '${input.truckId}' is in garage`);
      }

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

   
    // Errors array
    const errorMessages: string[] = [];

    // refTravel controls
    if(input.refTravel && input.refTravel != travel.refTravel) {
      try {
        const travelByRef = await this.repository.findOne({ where : { refTravel : input.refTravel } }); 
        if(travelByRef) {
          errorMessages.push(`Travel with ref '${input.refTravel}' already exists`);
        }
      } catch {
        errorMessages.push(`Cannot check refTravel !`);
      }
    }

    // Company controls
    if(input.companyId && input.companyId != travel.company.id) {
      try {
        const company = await this.companyService.getCompanyById(
          ctx,
          input.companyId,
        );
        travel.company = plainToInstance(Company, company);
      } catch {
        errorMessages.push(`Company with ID '${input.companyId}'  Not Found`);
      }
    }

    // Truck controls
    if(input.truckId && input.truckId != travel.truck.id) { 
      try {
        const truck = await this.truckService.getRawTruckById(ctx, input.truckId);
        if (truck.isClosed) {
          errorMessages.push(`Truck with ID '${input.truckId}' is closed`);
        }
        if (truck.status == VEHICLE_STATUS.WORK){
          errorMessages.push(`Truck with ID '${input.truckId}' is already in a travel`);
        }
        if (truck.status == VEHICLE_STATUS.PANNE){
          errorMessages.push(`Truck with ID '${input.truckId}' is in panne`);
        }
        if (truck.status == VEHICLE_STATUS.GARAGE){
          errorMessages.push(`Truck with ID '${input.truckId}' is in garage`);
        }

        travel.truck = plainToInstance(Truck, truck);
      } catch {
        errorMessages.push(`Truck with ID '${input.truckId}'  Not Found`);
      }
    }

    const updatedTravel: Travel = {
      ...travel,
      ...plainToInstance(Travel, input),
    };

    // Status controls
    if (input.status && input.status != travel.status) {
      if(input.status == TRAVEL_STATUS.CREATED || input.status == TRAVEL_STATUS.CLOSED || input.status == TRAVEL_STATUS.CANCELLED) {
          updatedTravel.truck.status = VEHICLE_STATUS.AVAILABLE;
      } else {
          updatedTravel.truck.status = VEHICLE_STATUS.WORK;
      }
    }

    this.logger.log(ctx, `calling ${TravelRepository.name}.save`);
    const savedTravel = await this.repository.save(updatedTravel);

    return plainToInstance(TravelOutputDto, savedTravel, {
      excludeExtraneousValues: true,
    });
  }

  async removeInvoiceByTravelId(ctx: RequestContext, id: number): Promise<void> {
    this.logger.log(ctx, `${this.removeInvoiceByTravelId.name} was called`);

    this.logger.log(ctx, `calling ${TravelRepository.name}.getById`);
    const travel = await this.repository.getById(id);
    travel.invoice = null;
    await this.repository.save(travel);
  }

  async deleteTravel(ctx: RequestContext, id: number): Promise<void> {
    this.logger.log(ctx, `${this.deleteTravel.name} was called`);

    this.logger.log(ctx, `calling ${TravelRepository.name}.getById`);
    const travel = await this.repository.getById(id);
    const travelOnly = plainToInstance(Travel,  { id : travel.id, refTravel : travel.refTravel})

    const actor: Actor = ctx.user;

    const isAllowed = this.aclService
      .forActor(actor)
      .canDoAction(Action.Delete, travel);
    if (!isAllowed) {
      throw new UnauthorizedException();
    }

    this.logger.log(ctx, `calling ${TravelRepository.name}.remove`);
    try {
      // Remove Travel and update Truck
      const queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();
      await queryRunner.manager.update(Truck, travel.truck.id, { status: VEHICLE_STATUS.AVAILABLE });
      await queryRunner.manager.remove(travelOnly);
      await queryRunner.commitTransaction();
    } catch (err) {
      throw new NotAcceptableException(
        'Cannot delete a parent : a forein key constraint',
      );
    }
  }
}
