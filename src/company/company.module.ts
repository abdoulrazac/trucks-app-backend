import { Module } from '@nestjs/common';
import { CompanyService } from './services/company.service';
import { CompanyAclService } from './services/company-acl.service';
import { CompanyController } from './controllers/company.controller';
import { JwtAuthStrategy } from "../auth/strategies/jwt-auth.strategy";
import {CompanyRepository} from "./repositories/company.repository";
import { SharedModule } from "../shared/shared.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Company } from "./entities/company.entity";
import { UserModule } from "../user/user.module";

@Module({
  imports: [
    SharedModule,
    TypeOrmModule.forFeature([Company]),
    UserModule
  ],
  providers: [
    CompanyService,
    JwtAuthStrategy,
    CompanyAclService,
    CompanyRepository
  ],
  controllers: [CompanyController],
  exports : [CompanyService]
})
export class CompanyModule {}
