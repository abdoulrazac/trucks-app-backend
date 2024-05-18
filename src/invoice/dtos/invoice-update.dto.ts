import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsDateString, IsEnum } from "class-validator";
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

import { INVOICE_STATUS } from "../../shared/constants/status.constant";

export class InvoiceUpdateDto {
  
  @ApiProperty()
  @IsOptional()
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
  @IsOptional()
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
}
