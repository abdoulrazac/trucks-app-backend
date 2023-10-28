import { Module } from '@nestjs/common';
import { ExpenseService } from './services/expense.service';
import { ExpenseAclService } from './services/expense-acl.service';
import { ExpenseController } from './controllers/expense.controller';
import { JwtAuthStrategy } from "../auth/strategies/jwt-auth.strategy";
import {ExpenseRepository} from "./repositories/expense.repository";
import { SharedModule } from "../shared/shared.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Expense } from "./entities/expense.entity";
import { UserModule } from "../user/user.module";
import { CategoryModule } from "../category/category.module";
import { VehicleModule } from "../vehicle/vehicle.module";

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
