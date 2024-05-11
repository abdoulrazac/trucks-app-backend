import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class InvoiceParamDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  numInvoice: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  unitPriceExtern: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  unitPriceIntern: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  valueTva: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  valueRetain: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  status: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  createdAt: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  updatedAt: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  companyId: number;
}
