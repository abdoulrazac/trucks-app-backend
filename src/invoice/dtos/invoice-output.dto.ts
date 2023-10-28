import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

import { CompanyMinOutputDto } from '../../company/dtos/company-min-output.dto';
import { TravelOutputDto } from '../../travel/dtos/travel-output.dto';

export class InvoiceOutputDto {
  @Expose()
  @ApiProperty()
  id: number;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  numInvoice: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  unitPriceExtern: number;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  unitPriceIntern: number;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  valueTva: number;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  valueRetain: number;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  status: string;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  @Type(() => TravelOutputDto)
  travels: TravelOutputDto[];

  @Expose()
  @ApiProperty()
  createdAt: Date;

  @Expose()
  @ApiProperty()
  updatedAt: Date;

  @Expose()
  @Type(() => CompanyMinOutputDto)
  @ApiProperty()
  company: CompanyMinOutputDto;
}
