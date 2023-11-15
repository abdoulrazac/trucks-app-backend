import { Injectable, UnauthorizedException} from '@nestjs/common';
import { plainToInstance } from "class-transformer";

import { Action } from "../../shared/acl/action.constant";
import { Actor } from "../../shared/acl/actor.constant";
import { orderClean, whereClauseClean } from "../../shared/helpers";
import { AppLogger } from "../../shared/logger/logger.service";
import { RequestContext } from "../../shared/request-context/request-context.dto";
import { VehicleCreateDto } from "../dtos/vehicle-create.dto";
import { VehicleOrderDto } from "../dtos/vehicle-order.dto";
import { VehicleOutputDto } from "../dtos/vehicle-output.dto";
import { VehicleParamDto } from "../dtos/vehicle-param.dto";
import { VehicleUpdateDto } from "../dtos/vehicle-update.dto";
import { Vehicle } from "../entities/vehicle.entity";
import { VehicleRepository } from "../repositories/vehicle.repository";
import { VehicleAclService } from "./vehicle-acl.service";

@Injectable()
export class VehicleService {
  constructor(
    private repository : VehicleRepository,
    private aclService : VehicleAclService,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(VehicleService.name);
  }

  async getVehicles(
    ctx: RequestContext,
    filters : VehicleParamDto,
    order: VehicleOrderDto,
    limit: number,
    offset: number,
  ): Promise<{ vehicles: VehicleOutputDto[]; count: number }> {
    this.logger.log(ctx, `${this.getVehicles.name} was called`);

    const actor: Actor = ctx.user;

    const isAllowed = this.aclService.forActor(actor).canDoAction(Action.List);
    if (!isAllowed) {
      throw new UnauthorizedException();
    }

    this.logger.log(ctx, `calling ${VehicleRepository.name}.findAndCount`);
    const [vehicles, count] = await this.repository.findAndCount({
      where: whereClauseClean(filters),
      order : orderClean(order),
      take: limit,
      skip: offset,
    });

    const vehiclesOutput = plainToInstance(VehicleOutputDto, vehicles, {
      excludeExtraneousValues: true,
    });

    return { vehicles: vehiclesOutput, count };
  }

  async createVehicle(
    ctx: RequestContext,
    input: VehicleCreateDto,
  ): Promise<VehicleOutputDto> {
    this.logger.log(ctx, `${this.createVehicle.name} was called`);

    const vehicle = plainToInstance(Vehicle, input);

    const actor: Actor = ctx.user;

    const isAllowed = this.aclService
      .forActor(actor)
      .canDoAction(Action.Create, vehicle);
    if (!isAllowed) {
      throw new UnauthorizedException();
    }

    this.logger.log(ctx, `calling ${VehicleRepository.name}.save`);
    const savedVehicle = await this.repository.save(vehicle);

    return plainToInstance(VehicleOutputDto, savedVehicle, {
      excludeExtraneousValues: true,
    });
  }

  async getVehicleById(
    ctx: RequestContext,
    id: number,
  ): Promise<VehicleOutputDto> {
    this.logger.log(ctx, `${this.getVehicleById.name} was called`);

    const actor: Actor = ctx.user;

    this.logger.log(ctx, `calling ${VehicleRepository.name}.getById`);
    const vehicle = await this.repository.getById(id);

    const isAllowed = this.aclService
      .forActor(actor)
      .canDoAction(Action.Read, vehicle);
    if (!isAllowed) {
      throw new UnauthorizedException();
    }

    return plainToInstance(VehicleOutputDto, vehicle, {
      excludeExtraneousValues: true,
    });
  }

  async updateVehicle(
    ctx: RequestContext,
    vehicleId: number,
    input: VehicleUpdateDto,
  ): Promise<VehicleOutputDto> {
    this.logger.log(ctx, `${this.updateVehicle.name} was called`);

    this.logger.log(ctx, `calling ${VehicleRepository.name}.getById`);
    const vehicle = await this.repository.getById(vehicleId);

    const actor: Actor = ctx.user;

    const isAllowed = this.aclService
      .forActor(actor)
      .canDoAction(Action.Update, vehicle);
    if (!isAllowed) {
      throw new UnauthorizedException();
    }

    const updatedVehicle: Vehicle = {
      ...vehicle,
      ...plainToInstance(Vehicle, input),
    };

    this.logger.log(ctx, `calling ${VehicleRepository.name}.save`);
    const savedVehicle = await this.repository.save(updatedVehicle);

    return plainToInstance(VehicleOutputDto, savedVehicle, {
      excludeExtraneousValues: true,
    });
  }

  async deleteVehicle(ctx: RequestContext, id: number): Promise<void> {
    this.logger.log(ctx, `${this.deleteVehicle.name} was called`);

    this.logger.log(ctx, `calling ${VehicleRepository.name}.getById`);
    const vehicle = await this.repository.getById(id);

    const actor: Actor = ctx.user;

    const isAllowed = this.aclService
      .forActor(actor)
      .canDoAction(Action.Delete, vehicle);
    if (!isAllowed) {
      throw new UnauthorizedException();
    }

    this.logger.log(ctx, `calling ${VehicleRepository.name}.remove`);
    await this.repository.remove(vehicle);
  }
}
