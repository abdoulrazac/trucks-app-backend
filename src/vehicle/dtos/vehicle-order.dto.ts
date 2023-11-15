import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsOptional,
  IsString
} from 'class-validator';

export enum OrderColumn {
  label = 'label',
  numImat = 'numImat',
  vehicleType = 'vehicleType',
  vehicleColor = 'vehicleColor',
  brand = 'brand',
  vehicleModel = 'vehicleModel',
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
