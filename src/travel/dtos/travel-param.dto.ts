import {ApiPropertyOptional} from '@nestjs/swagger';
import {Transform} from 'class-transformer';
import {IsDateString, IsEnum, IsNumber, IsOptional, IsString, Min,} from 'class-validator';

import {TRAVEL_STATUS} from "../../shared/constants";

export class TravelParamDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  refTravel: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  refUnloading: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  signatureDate: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(TRAVEL_STATUS)
  status: TRAVEL_STATUS;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  product: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  departureDate: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  arrivalDate: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  departureCountry: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  arrivalCountry: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  departureCity: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  arrivalCity: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  departureWeight: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  arrivalWeight: number;

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

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  truckId: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  invoiceId: number;
}
