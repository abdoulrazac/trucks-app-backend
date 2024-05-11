import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";

import { JwtAuthStrategy } from "../auth/strategies/jwt-auth.strategy";
import { SharedModule } from "../shared/shared.module";
import { VehicleController } from './controllers/vehicle.controller';
import { Vehicle } from "./entities/vehicle.entity";
import {VehicleRepository} from "./repositories/vehicle.repository";
import { VehicleService } from './services/vehicle.service';
import { VehicleAclService } from './services/vehicle-acl.service';

@Module({
  imports: [
    SharedModule,
    TypeOrmModule.forFeature([Vehicle]),
  ],
  providers: [
    VehicleService,
    JwtAuthStrategy,
    VehicleAclService,
    VehicleRepository,
  ],
  controllers: [VehicleController],
  exports : [VehicleService]
})
export class VehicleModule {}
