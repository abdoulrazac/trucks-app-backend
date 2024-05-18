import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtAuthStrategy } from '../auth/strategies/jwt-auth.strategy';
import { CompanyModule } from '../company/company.module';
import { SharedModule } from '../shared/shared.module';
import { UserModule } from '../user/user.module';
import { InvoiceController } from './controllers/invoice.controller';
import { Invoice } from './entities/invoice.entity';
import { InvoiceRepository } from './repositories/invoice.repository';
import { InvoiceService } from './services/invoice.service';
import { InvoiceAclService } from './services/invoice-acl.service';

@Module({
  imports: [
    SharedModule,
    TypeOrmModule.forFeature([Invoice]),
    UserModule,
    CompanyModule,
  ],
  providers: [
    InvoiceService,
    JwtAuthStrategy,
    InvoiceAclService,
    InvoiceRepository,
  ],
  controllers: [InvoiceController],
  exports: [InvoiceService],
})
export class InvoiceModule {}
