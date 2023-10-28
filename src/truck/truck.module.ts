import { Module } from '@nestjs/common';
import { TruckService } from './services/truck.service';
import { TruckAclService } from './services/truck-acl.service';
import { TruckController } from './controllers/truck.controller';
import { JwtAuthStrategy } from "../auth/strategies/jwt-auth.strategy";
import {TruckRepository} from "./repositories/truck.repository";
import { SharedModule } from "../shared/shared.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Truck } from "./entities/truck.entity";
import { UserModule } from "../user/user.module";
import { CategoryModule } from "../category/category.module";
import { VehicleModule } from "../vehicle/vehicle.module";

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
