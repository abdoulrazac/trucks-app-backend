import {Module} from '@nestjs/common';
import {ScheduleModule} from '@nestjs/schedule';

import {AppController} from './app.controller';
import {AppService} from './app.service';
import {AuthModule} from "./auth/auth.module";
import {CategoryModule} from './category/category.module';
import {CompanyModule} from './company/company.module';
import {ContractModule} from './contract/contract.module';
import {ExpenseModule} from './expense/expense.module';
import {FileModule} from './file/file.module';
import {InvoiceModule} from './invoice/invoice.module';
import {MailSenderModule} from './mail-sender/mail-sender.module';
import {SharedModule} from './shared/shared.module';
import {TravelModule} from './travel/travel.module';
import {TruckModule} from './truck/truck.module';
import {UserModule} from './user/user.module';
import {VehicleModule} from './vehicle/vehicle.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    SharedModule,
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
    MailSenderModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
