import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsOptional,
  IsString
} from 'class-validator';

export enum OrderColumn {
  shortname = 'shortname',
  longname = 'longname',
  address = 'address',
  numTel = 'numTel',
  numPostal = 'numPostal',
  numRccm = 'numRccm',
  numIfu = 'numIfu',
  taxSystem = 'taxSystem',
  taxDivision = 'taxDivision',
  email = 'email',
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
