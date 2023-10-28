import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class TravelCreateDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  refTravel: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  signatureDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  product: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  status: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsDate()
  departureDate: Date;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsDate()
  arrivalDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  departureCity: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  arrivalCity: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  departureWeight: number;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
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
}
