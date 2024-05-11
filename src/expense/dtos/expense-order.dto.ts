import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsOptional,
  IsString
} from 'class-validator';

export enum OrderColumn {
  label = 'label',
  description = 'description',
  unitPrice = 'unitPrice',
  unitNumber = 'unitNumber',
  categories = 'categories',
  vehicle = 'vehicle',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
}

export class ExpenseOrderDto {

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
