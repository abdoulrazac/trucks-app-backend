import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsOptional,
  IsString
} from 'class-validator';

export enum OrderColumn {
  refBreakdown = 'refBreakdown',
  type = 'type',
  status = 'status',
  label = 'label',
  description = 'description',
  occurredAt = 'occurredAt',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
}


export class BreakdownOrderDto {

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
