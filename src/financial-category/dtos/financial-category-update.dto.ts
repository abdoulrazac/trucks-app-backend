import { ApiProperty } from '@nestjs/swagger';
import {Transform} from "class-transformer";
import {IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Min, MinLength} from 'class-validator';

import { FINANCIAL_TYPE } from "./../../shared/constants/status.constant";

export class FinancialCategoryUpdateDto {
  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsEnum(FINANCIAL_TYPE)
  type: FINANCIAL_TYPE;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  label: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  groupId: number;
}
