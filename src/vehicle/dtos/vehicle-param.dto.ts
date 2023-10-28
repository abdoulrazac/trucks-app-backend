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
  fullSearch: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  numImat: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  type: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  color: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  brand: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  model: string;

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
