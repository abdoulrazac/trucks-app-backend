import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

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
  @IsString()
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
