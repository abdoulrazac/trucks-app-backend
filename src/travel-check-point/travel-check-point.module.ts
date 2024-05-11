import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";

import { JwtAuthStrategy } from "../auth/strategies/jwt-auth.strategy";
import { SharedModule } from "../shared/shared.module";
import { UserModule } from "../user/user.module";
import { CheckPointModule } from "./../check-point/check-point.module";
import { TravelModule } from "./../travel/travel.module";
import { TravelCheckPointController } from './controllers/travel-check-point.controller';
import { TravelCheckPoint } from "./entities/travel-check-point.entity";
import {TravelCheckPointRepository} from "./repositories/travel-check-point.repository";
import { TravelCheckPointService } from './services/travel-check-point.service';
import { TravelCheckPointAclService } from './services/travel-check-point-acl.service';

@Module({
  imports: [
    SharedModule,
    TypeOrmModule.forFeature([TravelCheckPoint]),
    UserModule,
    CheckPointModule,
    TravelModule
  ],
  providers: [
    TravelCheckPointService,
    JwtAuthStrategy,
    TravelCheckPointAclService,
    TravelCheckPointRepository
  ],
  controllers: [TravelCheckPointController],
  exports : [TravelCheckPointService]
})
export class TravelCheckPointModule {}
