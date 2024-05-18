import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

import { TravelMinOutputDto } from '../../travel/dtos/travel-min-output.dto';
import { INVOICE_STATUS } from "./../../shared/constants/status.constant";

export class InvoiceCreateDto {
  
  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  invoiceDate: Date; 

  @ApiProperty()
  @IsOptional()
  @IsString()
  description: string;

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
  @IsNumber()
  valueTva: number;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  valueRetain: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(INVOICE_STATUS)
  status: INVOICE_STATUS;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  companyId: number;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  @IsNotEmpty() 
  @Type(() => TravelMinOutputDto)
  travels: TravelMinOutputDto[];
}
