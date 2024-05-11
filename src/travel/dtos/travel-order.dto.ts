import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export enum OrderColumn {
  refTravel = 'refTravel',
  refUnloading = 'refUnloading',
  signatureDate = 'signatureDate',
  status = 'status',
  product = 'product',
  departureDate = 'departureDate',
  arrivalDate = 'arrivalDate',
  departureCountry = 'departureCountry',
  arrivalCountry = 'arrivalCountry',
  departureCity = 'departureCity',
  arrivalCity = 'arrivalCity',
  departureWeight = 'departureWeight',
  arrivalWeight = 'arrivalWeight',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
}


export class TravelOrderDto {

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
