import {Injectable, NotAcceptableException, UnauthorizedException,} from '@nestjs/common';
import {plainToInstance} from 'class-transformer';

import {Action} from '../../shared/acl/action.constant';
import {Actor} from '../../shared/acl/actor.constant';
import {orderClean, whereClauseClean} from '../../shared/helpers';
import {AppLogger} from '../../shared/logger/logger.service';
import {RequestContext} from '../../shared/request-context/request-context.dto';
import {TruckCreateDto} from '../dtos/truck-create.dto';
import {TruckOrderDto} from '../dtos/truck-order.dto';
import {TruckOutputDto} from '../dtos/truck-output.dto';
import {TruckParamDto} from '../dtos/truck-param.dto';
import {TruckUpdateDto} from '../dtos/truck-update.dto';
import {Truck} from '../entities/truck.entity';
import {TruckRepository} from '../repositories/truck.repository';
import {TruckAclService} from './truck-acl.service';
import {VehicleService} from '../../vehicle/services/vehicle.service';
import {Vehicle} from '../../vehicle/entities/vehicle.entity';
import {UserService} from '../../user/services/user.service';
import {User} from '../../user/entities/user.entity';
import {VEHICLE_TYPE} from 'src/shared/constants';

@Injectable()
export class TruckService {
  constructor(
    private repository: TruckRepository,
    private aclService: TruckAclService,
    private userService: UserService,
    private vehicleService: VehicleService,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(TruckService.name);
  }

  async getTrucks(
    ctx: RequestContext,
    filters: TruckParamDto,
    order: TruckOrderDto,
    limit: number,
    offset: number,
  ): Promise<{ trucks: TruckOutputDto[]; count: number }> {
    this.logger.log(ctx, `${this.getTrucks.name} was called`);

    const actor: Actor = ctx.user;

    const isAllowed = this.aclService.forActor(actor).canDoAction(Action.List);
    if (!isAllowed) {
      throw new UnauthorizedException();
    }

    this.logger.log(ctx, `calling ${TruckRepository.name}.findAndCount`);
    const [trucks, count] = await this.repository.findAndCount({
      where: whereClauseClean(filters),
      order: orderClean(order),
      relations: {
        conductor: true,
        tractor: true,
        semiTrailer: true,
      },
      take: limit,
      skip: offset,
    });

    const trucksOutput = plainToInstance(TruckOutputDto, trucks, {
      excludeExtraneousValues: true,
    });

    return { trucks: trucksOutput, count };
  }

  async createTruck(
    ctx: RequestContext,
    input: TruckCreateDto,
  ): Promise<TruckOutputDto> {
    this.logger.log(ctx, `${this.createTruck.name} was called`);

    const truck = plainToInstance(Truck, input);

    const actor: Actor = ctx.user;

    const isAllowed = this.aclService
      .forActor(actor)
      .canDoAction(Action.Create, truck);
    if (!isAllowed) {
      throw new UnauthorizedException();
    }

    // Errors array
    const errorMessages: string[] = [];

    // Conductor controls
    try {
      this.logger.log(ctx, `calling ${UserService.name}.getUserById`);
      const conductor = await this.userService.getUserById(
        ctx,
        input.conductorId,
      );
      if (conductor.isAssigned) {
        errorMessages.push(
          `Conductor with ${input.conductorId} is already assigned !`,
        );
      } else {
        truck.conductor = plainToInstance(User, conductor);
        truck.conductor.isAssigned = true;
      }
    } catch {
      errorMessages.push(`Conductor with ID '${input.conductorId}'  Not Found`);
    } 

    // Tractor controls 
    try {
      this.logger.log(ctx, `calling ${VehicleService.name}.getVehicleById`);
      const tractor = await this.vehicleService.getVehicleById(
        ctx,
        input.tractorId,
      );
      if (tractor.isAssigned || tractor.vehicleType != VEHICLE_TYPE.TRACTOR) {
        errorMessages.push(
          `Tractor with ${input.tractorId} is already assigned or Not a Tractor !`,
        );
      } else {
        truck.tractor = plainToInstance(Vehicle, tractor);
        truck.tractor.isAssigned = true;
      }
    } catch {
      errorMessages.push(`Tractor with ID '${input.tractorId}'  Not Found`);
    } 

    // SemiTrailer controls 
    try {
      this.logger.log(ctx, `calling ${VehicleService.name}.getVehicleById`);
      const semiTrailer = await this.vehicleService.getVehicleById(
        ctx,
        input.semiTrailerId,
      ); 
      if (semiTrailer.isAssigned || semiTrailer.vehicleType != VEHICLE_TYPE.SEMI_TRAILER) {
        errorMessages.push(
          `SemiTrailer with ${input.semiTrailerId} is already assigned or Not a SemiTrailer !`,
        );
      } else {
        truck.semiTrailer = plainToInstance(Vehicle, semiTrailer);
        truck.semiTrailer.isAssigned = true;
      }
    } catch {
      errorMessages.push(
        `SemiTrailer with ID '${input.semiTrailerId}'  Not Found`,
      );
    } 

    if (errorMessages.length != 0) {
      throw new NotAcceptableException(errorMessages);
    }
    truck.description = truck.conductor.name + ' ' + 
                        truck.conductor.numTel + ' ' +  
                        truck.tractor.numImat + ' ' +  
                        truck.semiTrailer.numImat + ' ' + 
                        truck.tractor.vehicleModel ;

    this.logger.log(ctx, `calling ${TruckRepository.name}.save`);
    const savedTruck = await this.repository.save(truck);

    return plainToInstance(TruckOutputDto, savedTruck, {
      excludeExtraneousValues: true,
    });
  }

  async getTruckById(ctx: RequestContext, id: number): Promise<TruckOutputDto> {
    this.logger.log(ctx, `${this.getTruckById.name} was called`);

    const actor: Actor = ctx.user;

    this.logger.log(ctx, `calling ${TruckRepository.name}.getById`);
    const truck = await this.repository.getById(id);

    const isAllowed = this.aclService
      .forActor(actor)
      .canDoAction(Action.Read, truck);
    if (!isAllowed) {
      throw new UnauthorizedException();
    }

    return plainToInstance(TruckOutputDto, truck, {
      excludeExtraneousValues: true,
    });
  }
  
  async getRawTruckById(ctx: RequestContext, id: number): Promise<Truck> {
    this.logger.log(ctx, `${this.getRawTruckById.name} was called`);

    this.logger.log(ctx, `calling ${TruckRepository.name}.getById`);
    return await this.repository.createQueryBuilder('truck')
      .select()
      .where('truck.id = :id', { id })
      .getOne();
  }

  async updateTruck(
    ctx: RequestContext,
    truckId: number,
    input: TruckUpdateDto,
  ): Promise<TruckOutputDto> {
    this.logger.log(ctx, `${this.updateTruck.name} was called`);

    this.logger.log(ctx, `calling ${TruckRepository.name}.getById`);
    const truck = await this.repository.getById(truckId);
    if (truck.isClosed) {
      throw new NotAcceptableException('This truck is closed');
    }

    const actor: Actor = ctx.user;

    const isAllowed = this.aclService
      .forActor(actor)
      .canDoAction(Action.Update, truck);
    if (!isAllowed) {
      throw new UnauthorizedException();
    }

    const errorMessages: string[] = [];

    // Conductor controls
    if (input.conductorId && input.conductorId != truck.conductor.id) {
      try {
        this.logger.log(ctx, `calling ${UserService.name}.getUserById`);
        const conductor = await this.userService.getUserById(
          ctx,
          input.conductorId,
        );
        if (conductor.isAssigned) {
          errorMessages.push(
            `Conductor with ${input.conductorId} is already assigned !`,
          );
        } else {
          truck.conductor = plainToInstance(User, conductor);
          truck.conductor.isAssigned = true;
        }
      } catch {
        errorMessages.push(
          `Conductor with ID '${input.conductorId}'  Not Found`,
        );
      }
    }

    // Tractor controls 
    if (input.tractorId && input.tractorId != truck.tractor.id) {
      try {
        this.logger.log(ctx, `calling ${VehicleService.name}.getVehicleById`);
        const tractor = await this.vehicleService.getVehicleById(
          ctx,
          input.tractorId,
        );
        if (tractor.isAssigned || tractor.vehicleType != VEHICLE_TYPE.TRACTOR) {
          errorMessages.push(
            `Tractor with ${input.tractorId} is already assigned or Not a Tractor !`,
          );
        } else {
          truck.tractor = plainToInstance(Vehicle, tractor);
          truck.tractor.isAssigned = true;
        }
      } catch {
        errorMessages.push(`Tractor with ID '${input.tractorId}'  Not Found`);
      }
    }

    // SemiTrailer controls
    if (input.semiTrailerId && input.semiTrailerId != truck.semiTrailer.id) {
      try {
        this.logger.log(ctx, `calling ${VehicleService.name}.getVehicleById`);
        const semiTrailer = await this.vehicleService.getVehicleById(
          ctx,
          input.semiTrailerId,
        );
        if (semiTrailer.isAssigned || semiTrailer.vehicleType != VEHICLE_TYPE.SEMI_TRAILER) {
          errorMessages.push(
            `SemiTrailer with ${input.semiTrailerId} is already assigned or Not a SemiTrailer !`,
          );
        } else {
          truck.semiTrailer = plainToInstance(Vehicle, semiTrailer);
          truck.semiTrailer.isAssigned = true;
        }
      } catch {
        errorMessages.push(
          `SemiTrailer with ID '${input.semiTrailerId}'  Not Found`,
        );
      }
    }

    // Check if there is an error
    if (errorMessages.length != 0) {
      throw new NotAcceptableException(errorMessages);
    }
    if (input.isClosed) {
      truck.conductor.isAssigned = false;
      truck.tractor.isAssigned = false;
      truck.semiTrailer.isAssigned = false;
    }
    truck.description = truck.conductor.name + ' ' + 
                        truck.conductor.numTel + ' ' +  
                        truck.tractor.numImat + ' ' +  
                        truck.semiTrailer.numImat + ' ' + 
                        truck.tractor.vehicleModel ;

    const updatedTruck: Truck = {
      ...truck,
      ...plainToInstance(Truck, input),
    };

    this.logger.log(ctx, `calling ${TruckRepository.name}.save`);
    const savedTruck = await this.repository.save(updatedTruck); 

    return plainToInstance(TruckOutputDto, savedTruck, {
      excludeExtraneousValues: true,
    });
  }

  async deleteTruck(ctx: RequestContext, id: number): Promise<void> {
    this.logger.log(ctx, `${this.deleteTruck.name} was called`);

    this.logger.log(ctx, `calling ${TruckRepository.name}.getById`);
    const truck = await this.repository.getById(id);

    const actor: Actor = ctx.user;

    const isAllowed = this.aclService
      .forActor(actor)
      .canDoAction(Action.Delete, truck);
    if (!isAllowed) {
      throw new UnauthorizedException();
    }

    this.logger.log(ctx, `calling ${TruckRepository.name}.remove`);
    try {
      await this.repository.remove(truck);
    } catch (err) {
      throw new NotAcceptableException(
        'Cannot delete a parent : a forein key constraint',
      );
    }
  }
}
