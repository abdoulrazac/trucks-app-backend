import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsOptional,
  IsString
} from 'class-validator';

export enum OrderColumn {
  type = 'type',
  primePercent = 'primePercent',
  primeTravelLimit = 'primeTravelLimit',
  refContract = 'refContract',
  amount = 'amount',
  startDate = 'startDate',
  endDate = 'endDate',
  isClosed = 'isClosed',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
}


export class ContractOrderDto {

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
