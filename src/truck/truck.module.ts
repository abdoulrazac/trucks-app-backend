import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";

import { JwtAuthStrategy } from "../auth/strategies/jwt-auth.strategy";
import { CategoryModule } from "../category/category.module";
import { SharedModule } from "../shared/shared.module";
import { UserModule } from "../user/user.module";
import { VehicleModule } from "../vehicle/vehicle.module";
import { TruckController } from './controllers/truck.controller';
import { Truck } from "./entities/truck.entity";
import {TruckRepository} from "./repositories/truck.repository";
import { TruckService } from './services/truck.service';
import { TruckAclService } from './services/truck-acl.service';

@Module({
  imports: [
    SharedModule,
    TypeOrmModule.forFeature([Truck]),
    UserModule,
    CategoryModule,
    VehicleModule
  ],
  providers: [
    TruckService,
    JwtAuthStrategy,
    TruckAclService,
    TruckRepository
  ],
  controllers: [TruckController],
  exports : [TruckService]
})
export class TruckModule {}
