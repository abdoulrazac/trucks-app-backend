import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsOptional,
  IsString,
} from 'class-validator';
import { transformToBoolean } from 'src/shared/helpers';

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
  @IsDateString()
  createdAt: string;

  @ApiPropertyOptional()
  @IsOptional()
  
  @IsDateString()
  updatedAt: string;
}
