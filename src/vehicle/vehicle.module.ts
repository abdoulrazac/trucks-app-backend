import { Module } from '@nestjs/common';
import { VehicleService } from './services/vehicle.service';
import { VehicleAclService } from './services/vehicle-acl.service';
import { VehicleController } from './controllers/vehicle.controller';
import { JwtAuthStrategy } from "../auth/strategies/jwt-auth.strategy";
import {VehicleRepository} from "./repositories/vehicle.repository";
import { SharedModule } from "../shared/shared.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Vehicle } from "./entities/vehicle.entity";
import { UserModule } from "../user/user.module";

@Module({
  imports: [
    SharedModule,
    TypeOrmModule.forFeature([Vehicle]),
    UserModule
  ],
  providers: [
    VehicleService,
    JwtAuthStrategy,
    VehicleAclService,
    VehicleRepository
  ],
  controllers: [VehicleController],
  exports : [VehicleService]
})
export class VehicleModule {}
