import {ApiPropertyOptional} from '@nestjs/swagger';
import {Transform} from "class-transformer";
import {IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, Min,} from 'class-validator';

export class CheckPointParamDto {

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  rank: number;

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
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  routeId: number;

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
