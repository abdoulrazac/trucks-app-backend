import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";

import { JwtAuthStrategy } from "../auth/strategies/jwt-auth.strategy";
import { SharedModule } from "../shared/shared.module";
import { UserModule } from "../user/user.module";
import { RouteModule } from "./../route/route.module";
import { CheckPointController } from './controllers/check-point.controller';
import { CheckPoint } from "./entities/check-point.entity";
import {CheckPointRepository} from "./repositories/check-point.repository";
import { CheckPointService } from './services/check-point.service';
import { CheckPointAclService } from './services/check-point-acl.service';

@Module({
  imports: [
    SharedModule,
    TypeOrmModule.forFeature([CheckPoint]),
    UserModule,
    RouteModule
  ],
  providers: [
    CheckPointService,
    JwtAuthStrategy,
    CheckPointAclService,
    CheckPointRepository
  ],
  controllers: [CheckPointController],
  exports : [CheckPointService]
})
export class CheckPointModule {}
