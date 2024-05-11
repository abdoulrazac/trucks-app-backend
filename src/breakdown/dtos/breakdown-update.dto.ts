import { ApiProperty } from '@nestjs/swagger';
import { Transform } from "class-transformer";
import { IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";

import { transformToBoolean } from '../../shared/helpers';

export class BreakdownUpdateDto {
  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  refBreakdown : string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  type: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  status: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  label: string;


  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsDateString()
  occurredAt: Date;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  vehicleId: number;
}
