import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsOptional,
  IsString
} from 'class-validator';

export enum OrderColumn {
  transactionRef = 'transactionRef',
  type = 'type',
  label = 'label',
  description = 'description',
  unitPrice = 'unitPrice',
  unitNumber = 'unitNumber',
  categories = 'categories',
  transactionDate = 'transactionDate',
  vehicleId = 'vehicleId',
  breakdownId = 'breakdownId',
  invoiceId = 'invoiceId',
  userId = 'userId',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
}

export class FinanceOrderDto {

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
