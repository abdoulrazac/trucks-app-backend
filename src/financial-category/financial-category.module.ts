import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";

import { JwtAuthStrategy } from "../auth/strategies/jwt-auth.strategy";
import { SharedModule } from "../shared/shared.module";
import { UserModule } from "../user/user.module";
import { FinancialCategoryController } from './controllers/financial-category.controller';
import { FinancialCategory } from "./entities/financial-category.entity";
import {FinancialCategoryRepository} from "./repositories/financial-category.repository";
import { FinancialCategoryService } from './services/financial-category.service';
import { FinancialCategoryAclService } from './services/financial-category-acl.service';

@Module({
  imports: [
    SharedModule,
    TypeOrmModule.forFeature([FinancialCategory]),
    UserModule,
  ],
  providers: [
    FinancialCategoryService,
    JwtAuthStrategy,
    FinancialCategoryAclService,
    FinancialCategoryRepository
  ],
  controllers: [FinancialCategoryController],
  exports : [FinancialCategoryService]
})
export class FinancialCategoryModule {}
