import { Module } from '@nestjs/common';
import { InvoiceService } from './services/invoice.service';
import { InvoiceAclService } from './services/invoice-acl.service';
import { InvoiceController } from './controllers/invoice.controller';
import { JwtAuthStrategy } from '../auth/strategies/jwt-auth.strategy';
import { InvoiceRepository } from './repositories/invoice.repository';
import { SharedModule } from '../shared/shared.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from './entities/invoice.entity';
import { UserModule } from '../user/user.module';
import { CompanyModule } from '../company/company.module';

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
