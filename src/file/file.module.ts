import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import { VehicleModule } from 'src/vehicle/vehicle.module';

import {JwtAuthStrategy} from '../auth/strategies/jwt-auth.strategy';
import { BreakdownModule } from '../breakdown/breakdown.module';
import {CompanyModule} from '../company/company.module';
import { ContractModule } from '../contract/contract.module';
import {FinanceModule} from '../finance/finance.module';
import {InvoiceModule} from "../invoice/invoice.module";
import {SharedModule} from '../shared/shared.module';
import { TravelModule } from '../travel/travel.module';
import {UserModule} from '../user/user.module';
import {FileController} from './controllers/file.controller';
import {File} from './entities/file.entity';
import {FileRepository} from './repositories/file.repository';
import {FileService} from './services/file.service';
import {FileAclService} from './services/file-acl.service';

@Module({
  imports: [
    SharedModule,
    TypeOrmModule.forFeature([File]),
    UserModule,
    CompanyModule,
    FinanceModule,
    InvoiceModule,
    ContractModule,
    BreakdownModule,
    VehicleModule,
    TravelModule
  ],
  providers: [FileService, JwtAuthStrategy, FileAclService, FileRepository],
  controllers: [FileController],
  exports: [FileService],
})
export class FileModule {}
