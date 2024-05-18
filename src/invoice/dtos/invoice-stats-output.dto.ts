import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class InvoiceStatsOutputDto {
  @Expose()
  @ApiProperty()
  invoiceCountByStatus : {status : string, count : number}[];

  @Expose()
  @ApiProperty()
  invoiceCountByCompany : {company : string, count : number}[];

  @Expose()
  @ApiProperty()
  lastInvoices : InvoiceStatsOutputDto[];
}
