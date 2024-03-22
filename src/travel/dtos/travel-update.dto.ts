import {ApiProperty} from '@nestjs/swagger';
import {Transform} from "class-transformer";
import {IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Min} from "class-validator";
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
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  @IsDate()
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
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  @IsDate()
  departureDate: Date;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  @IsDate()
  arrivalDate: Date;

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
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  departureWeight: number ;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  truckWeight: number ;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  arrivalWeight: number ;

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
}
