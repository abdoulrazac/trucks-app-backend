import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsOptional,
  IsString
} from 'class-validator';

export enum OrderColumn {
  checkPointId = 'checkPointId',
  travelId = 'travelId',
  description = 'description',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
}


export class TravelCheckPointOrderDto {

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
