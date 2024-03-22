import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { transformToBoolean } from 'src/shared/helpers';
import { VEHICLE_TYPE } from 'src/shared/constants';

export class VehicleParamDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  numImat: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  vehicleType: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  vehicleColor: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  brand: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  vehicleModel: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  volume: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  axleNumber: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(
    ({ value }) => transformToBoolean(value),
    { toClassOnly: true },
  )
  @IsBoolean()
  isAssigned: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNotEmpty()
  @IsDateString()
  createdAt: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNotEmpty()
  @IsDateString()
  updatedAt: string;
}
