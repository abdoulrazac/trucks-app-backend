import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";

import { JwtAuthStrategy } from "../auth/strategies/jwt-auth.strategy";
import { SharedModule } from "../shared/shared.module";
import { UserModule } from "../user/user.module";
import { DashboardController } from './controllers/dashboard.controller';
import {DashboardRepository} from "./repositories/dashboard.repository";
import { DashboardService } from './services/dashboard.service';

@Module({
  imports: [
    SharedModule,
    TypeOrmModule.forFeature([]),
    UserModule,
  ],
  providers: [
    DashboardService,
    JwtAuthStrategy,
    DashboardRepository
  ],
  controllers: [DashboardController],
  exports : [DashboardService]
})
export class DashboardModule {}
