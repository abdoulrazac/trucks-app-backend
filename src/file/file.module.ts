import {Module} from '@nestjs/common';
import {FileService} from './services/file.service';
import {FileAclService} from './services/file-acl.service';
import {FileController} from './controllers/file.controller';
import {JwtAuthStrategy} from '../auth/strategies/jwt-auth.strategy';
import {FileRepository} from './repositories/file.repository';
import {SharedModule} from '../shared/shared.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {File} from './entities/file.entity';
import {UserModule} from '../user/user.module';
import {CompanyModule} from '../company/company.module';
import {VehicleModule} from '../vehicle/vehicle.module';
import {ExpenseModule} from '../expense/expense.module';
import {InvoiceModule} from "../invoice/invoice.module";

@Module({
  imports: [
    SharedModule,
    TypeOrmModule.forFeature([File]),
    UserModule,
    CompanyModule,
    VehicleModule,
    ExpenseModule,
    InvoiceModule
  ],
  providers: [FileService, JwtAuthStrategy, FileAclService, FileRepository],
  controllers: [FileController],
  exports: [FileService],
})
export class FileModule {}
