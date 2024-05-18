import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

import { CompanyMinOutputDto } from '../../company/dtos/company-min-output.dto';
import { TravelOutputDto } from '../../travel/dtos/travel-output.dto';

export class InvoiceOutputDto {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  invoiceDate: Date;

  @Expose()
  @ApiProperty()
  description: string;

  @Expose()
  @ApiProperty()
  numInvoice: string;

  @Expose()
  @ApiProperty()
  unitPriceExtern: number;

  @Expose()
  @ApiProperty()
  unitPriceIntern: number;

  @Expose()
  @ApiProperty()
  valueTva: number;

  @Expose()
  @ApiProperty()
  valueRetain: number;

  @Expose()
  @ApiProperty()
  status: string;

  @Expose()
  @ApiProperty()
  travels: TravelOutputDto[];

  @Expose()
  @ApiProperty()
  createdAt: Date;

  @Expose()
  @ApiProperty()
  updatedAt: Date;

  @Expose()
  @ApiProperty()
  @Type(() => CompanyMinOutputDto)
  company: CompanyMinOutputDto;
}
