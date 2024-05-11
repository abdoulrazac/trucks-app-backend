import {ApiPropertyOptional} from '@nestjs/swagger';
import {Transform} from 'class-transformer';
import {IsBoolean, IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Min,} from 'class-validator';

import {VEHICLE_STATUS} from "../../shared/constants";
import {transformToBoolean} from '../../shared/helpers';

export class TruckParamDto {

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(
    ({ value }) => transformToBoolean(value),
    { toClassOnly: true },
  )
  @IsBoolean()
  isClosed: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(VEHICLE_STATUS)
  status: VEHICLE_STATUS;

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
  conductorId: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  tractorId: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  semiTrailerId: number;
}
