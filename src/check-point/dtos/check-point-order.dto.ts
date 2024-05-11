import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsOptional,
  IsString
} from 'class-validator';

export enum OrderColumn {
  rank = 'rank',
  label = 'label',
  description = 'description',
  groupId = 'groupId',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
}


export class CheckPointOrderDto {

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
