import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtAuthStrategy } from '../auth/strategies/jwt-auth.strategy';
import { CompanyModule } from '../company/company.module'; 
import { SharedModule } from '../shared/shared.module';
import { TruckModule } from '../truck/truck.module';
import { UserModule } from '../user/user.module';
import { TravelController } from './controllers/travel.controller';
import { Travel } from './entities/travel.entity';
import { TravelRepository } from './repositories/travel.repository';
import { TravelService } from './services/travel.service';
import { TravelAclService } from './services/travel-acl.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Travel]),
    SharedModule,
    UserModule,
    TruckModule,
    CompanyModule, 
  ],
  providers: [
    TravelService,
    JwtAuthStrategy,
    TravelAclService,
    TravelRepository,
  ],
  controllers: [TravelController],
  exports: [TravelService],
})
export class TravelModule {}
