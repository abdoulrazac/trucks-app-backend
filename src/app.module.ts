import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';
import { CompanyModule } from './company/company.module';
import { CategoryModule } from './category/category.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { ExpenseModule } from './expense/expense.module';
import { ContractModule } from './contract/contract.module';
import { MailingModule } from './mailing/mailing.module';
import { MailingService } from './mailing/services/mailing.service';
import { TruckModule } from './truck/truck.module';
import { TravelModule } from './travel/travel.module';
import { InvoiceModule } from './invoice/invoice.module';
import { FileModule } from './file/file.module';

@Module({
  imports: [
    SharedModule,
    MailingModule,
    AuthModule,
    UserModule,
    CompanyModule,
    CategoryModule,
    VehicleModule,
    ExpenseModule,
    ContractModule,
    TruckModule,
    TravelModule,
    InvoiceModule,
    FileModule,
  ],
  controllers: [AppController],
  providers: [AppService, MailingService],
})
export class AppModule {}
