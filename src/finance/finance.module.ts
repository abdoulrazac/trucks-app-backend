import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";

import { JwtAuthStrategy } from "../auth/strategies/jwt-auth.strategy";
import { CategoryModule } from "../category/category.module";
import { SharedModule } from "../shared/shared.module";
import { UserModule } from "../user/user.module";
import { VehicleModule } from "../vehicle/vehicle.module";
import { BreakdownModule } from "./../breakdown/breakdown.module";
import { InvoiceModule } from "./../invoice/invoice.module";
import { FinanceController } from './controllers/finance.controller';
import { Finance } from "./entities/finance.entity";
import {FinanceRepository} from "./repositories/finance.repository";
import { FinanceService } from './services/finance.service';
import { FinanceAclService } from './services/finance-acl.service';

@Module({
  imports: [
    SharedModule,
    TypeOrmModule.forFeature([Finance]),
    UserModule,
    CategoryModule,
    VehicleModule,
    BreakdownModule,
    InvoiceModule,
  ],
  providers: [
    FinanceService,
    JwtAuthStrategy,
    FinanceAclService,
    FinanceRepository
  ],
  controllers: [FinanceController],
  exports : [FinanceService]
})
export class FinanceModule {}
