import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsOptional,
  IsString
} from 'class-validator';

export enum OrderColumn {
  description = 'description',
  invoiceDate = 'invoiceDate',
  isClosed = 'isClosed',
  status = 'status',
  numInvoice = 'numInvoice',
  unitPriceExtern = 'unitPriceExtern',
  unitPriceIntern = 'unitPriceIntern',
  valueTva = 'valueTva',
  valueRetain = 'valueRetain',
  company = 'company',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
}


export class InvoiceOrderDto {

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsEnum(OrderColumn)
  orderByDesc: OrderColumn;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsEnum(OrderColumn)
  orderByAsc: OrderColumn;
}
