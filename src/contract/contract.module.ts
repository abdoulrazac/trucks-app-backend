import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";

import { JwtAuthStrategy } from "../auth/strategies/jwt-auth.strategy";
import { CategoryModule } from "../category/category.module";
import { SharedModule } from "../shared/shared.module";
import { UserModule } from "../user/user.module";
import { ContractController } from './controllers/contract.controller';
import { Contract } from "./entities/contract.entity";
import {ContractRepository} from "./repositories/contract.repository";
import { ContractService } from './services/contract.service';
import { ContractAclService } from './services/contract-acl.service';

@Module({
  imports: [
    SharedModule,
    TypeOrmModule.forFeature([Contract]),
    UserModule,
    CategoryModule,
  ],
  providers: [
    ContractService,
    JwtAuthStrategy,
    ContractAclService,
    ContractRepository
  ],
  controllers: [ContractController],
  exports : [ContractService]
})
export class ContractModule {}
