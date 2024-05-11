import {ApiPropertyOptional} from '@nestjs/swagger';
import {Transform} from "class-transformer";
import {IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, Min,} from 'class-validator';

export class TravelCheckPointParamDto {

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  checkPointId: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  travelId: number;

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
