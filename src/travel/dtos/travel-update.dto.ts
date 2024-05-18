import {ApiProperty} from '@nestjs/swagger';
import {Transform} from "class-transformer";
import {IsDate, IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Min} from "class-validator";

import {TRAVEL_STATUS} from "../../shared/constants";

export class TravelUpdateDto {
  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  refTravel: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  refUnloading: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsDateString()
  signatureDate: Date;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  product: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsEnum(TRAVEL_STATUS)
  status: TRAVEL_STATUS;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsDateString()
  departureDate: Date;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
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
  arrivalCity: string ;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => parseFloat(value), { toClassOnly: true })
  departureWeight: number ;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => parseFloat(value), { toClassOnly: true })
  truckWeight: number ;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => parseFloat(value), { toClassOnly: true })
  arrivalWeight: number ;
  

  @ApiProperty()
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  companyId: number ;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  truckId: number ;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  invoiceId: number ;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  routeId: number ;
}
