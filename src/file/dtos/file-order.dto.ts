import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export enum OrderColumn {
  label = 'label',
  description = 'description',
  category = 'category',
  extension = 'extension',
  size = 'size',
  author = 'author',
  company = 'company',
  expense = 'expense',
  vehicle = 'vehicle',
  travel = 'vehicle',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
}

export class FileOrderDto {
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
