import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsOptional,
  IsString
} from 'class-validator';

export enum OrderColumn {
  shortname = 'shortname',
  longname = 'longname',
  email = 'email',
  numTel = 'numTel',
  address = 'address',
  numPostal = 'numPostal',
  country = 'country',
  city = 'city',
  numRccm = 'numRccm',
  numIfu = 'numIfu',
  taxSystem = 'taxSystem',
  taxDivision = 'taxDivision',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
}


export class CompanyOrderDto {

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
