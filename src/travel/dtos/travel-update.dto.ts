import {ApiProperty} from '@nestjs/swagger';
import { Transform } from "class-transformer";
import {
  IsDateString,
  IsNotEmpty, IsNumber,
  IsOptional,
  IsString, Min
} from "class-validator";

export class TravelUpdateDto {
  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  refTravel: string;

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
  @IsString()
  status : string;

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
  departureWeight: number ;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  arrivalWeight: number ;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  companyId: number ;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  truckId: number ;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  invoiceId: number ;
}
