import { Module } from '@nestjs/common';
import { ContractService } from './services/contract.service';
import { ContractAclService } from './services/contract-acl.service';
import { ContractController } from './controllers/contract.controller';
import { JwtAuthStrategy } from "../auth/strategies/jwt-auth.strategy";
import {ContractRepository} from "./repositories/contract.repository";
import { SharedModule } from "../shared/shared.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Contract } from "./entities/contract.entity";
import { UserModule } from "../user/user.module";
import { CategoryModule } from "../category/category.module";
import { VehicleModule } from "../vehicle/vehicle.module";

@Module({
  imports: [
    SharedModule,
    TypeOrmModule.forFeature([Contract]),
    UserModule,
    CategoryModule,
    VehicleModule
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
