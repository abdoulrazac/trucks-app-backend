import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsOptional,
  IsString
} from 'class-validator';

export enum OrderColumn {
  label = 'label',
  numImat = 'numImat',
  type = 'type',
  color = 'color',
  brand = 'brand',
  model = 'model',
  volume = 'volume',
  axleNumber = 'axleNumber',
  isAssigned = 'isAssigned',
}


export class VehicleOrderDto {

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
