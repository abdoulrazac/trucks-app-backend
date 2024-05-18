import {Module} from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import {ScheduleModule} from '@nestjs/schedule';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

import {AppController} from './app.controller';
import {AppService} from './app.service';
import {AuthModule} from "./auth/auth.module";
import { BreakdownModule } from './breakdown/breakdown.module';
import {CategoryModule} from './category/category.module';
import { CheckPointModule } from './check-point/check-point.module';
import {CompanyModule} from './company/company.module';
import {ContractModule} from './contract/contract.module';
import { DashboardModule } from './dashboard/dashboard.module';
import {FileModule} from './file/file.module';
import {FinanceModule} from './finance/finance.module';
import { FinancialCategoryModule } from './financial-category/financial-category.module';
import {InvoiceModule} from './invoice/invoice.module';
import {MailSenderModule} from './mail-sender/mail-sender.module';
import { RouteModule } from './route/route.module';
import {SharedModule} from './shared/shared.module';
import {TravelModule} from './travel/travel.module';
import { TravelCheckPointModule } from './travel-check-point/travel-check-point.module';
import {TruckModule} from './truck/truck.module';
import {UserModule} from './user/user.module';
import {VehicleModule} from './vehicle/vehicle.module';

@Module({
  imports: [
    ThrottlerModule.forRoot([{
      ttl: 300,
      limit: 2,
    }]),
    ScheduleModule.forRoot(),
    SharedModule,
    AuthModule,
    UserModule,
    CompanyModule,
    CategoryModule,
    VehicleModule,
    FinanceModule,
    ContractModule,
    BreakdownModule,
    TruckModule,
    TravelModule,
    InvoiceModule,
    RouteModule,
    CheckPointModule,
    TravelCheckPointModule,
    FinancialCategoryModule,
    DashboardModule,

    FileModule,
    MailSenderModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ],
})
export class AppModule {}
