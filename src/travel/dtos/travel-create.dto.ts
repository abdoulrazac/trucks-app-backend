import {ApiProperty} from '@nestjs/swagger';
import {Transform} from 'class-transformer';
import {IsDate, IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

import {TRAVEL_STATUS} from "../../shared/constants";

export class TravelCreateDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  refTravel: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  product: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  signatureDate: Date;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description: string;
  

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  refUnloading: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsEnum(TRAVEL_STATUS)
  status: TRAVEL_STATUS;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  @IsDateString()
  departureDate: Date;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  @IsDateString()
  arrivalDate: Date;


  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  departureCountry: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  arrivalCountry: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  departureCity: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  arrivalCity: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => parseFloat(value), { toClassOnly: true })
  truckWeight: number;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => parseFloat(value), { toClassOnly: true })
  departureWeight: number;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => parseFloat(value), { toClassOnly: true })
  arrivalWeight: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  companyId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  truckId: number;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  routeId: number;
}
