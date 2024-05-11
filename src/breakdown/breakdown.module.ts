import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";

import { JwtAuthStrategy } from "../auth/strategies/jwt-auth.strategy";
import { CategoryModule } from "../category/category.module";
import { SharedModule } from "../shared/shared.module";
import { VehicleModule } from "../vehicle/vehicle.module";
import { BreakdownController } from './controllers/breakdown.controller';
import { Breakdown} from "./entities/breakdown.entity";
import {BreakdownRepository} from "./repositories/breakdown.repository";
import { BreakdownService } from './services/breakdown.service';
import { BreakdownAclService } from './services/breakdown-acl.service';

@Module({
  imports: [
    SharedModule,
    TypeOrmModule.forFeature([Breakdown]),
    CategoryModule,
    VehicleModule
  ],
  providers: [
    BreakdownService,
    JwtAuthStrategy,
    BreakdownAclService,
    BreakdownRepository
  ],
  controllers: [BreakdownController],
  exports : [BreakdownService]
})
export class BreakdownModule {}
