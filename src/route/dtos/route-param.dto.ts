import {ApiPropertyOptional} from '@nestjs/swagger';
import {Transform} from "class-transformer";
import {IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, Min,} from 'class-validator';

export class RouteParamDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  code: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  label: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description: string;

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
