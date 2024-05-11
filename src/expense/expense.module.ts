import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";

import { JwtAuthStrategy } from "../auth/strategies/jwt-auth.strategy";
import { CategoryModule } from "../category/category.module";
import { SharedModule } from "../shared/shared.module";
import { UserModule } from "../user/user.module";
import { VehicleModule } from "../vehicle/vehicle.module";
import { ExpenseController } from './controllers/expense.controller';
import { Expense } from "./entities/expense.entity";
import {ExpenseRepository} from "./repositories/expense.repository";
import { ExpenseService } from './services/expense.service';
import { ExpenseAclService } from './services/expense-acl.service';

@Module({
  imports: [
    SharedModule,
    TypeOrmModule.forFeature([Expense]),
    UserModule,
    CategoryModule,
    VehicleModule
  ],
  providers: [
    ExpenseService,
    JwtAuthStrategy,
    ExpenseAclService,
    ExpenseRepository
  ],
  controllers: [ExpenseController],
  exports : [ExpenseService]
})
export class ExpenseModule {}
