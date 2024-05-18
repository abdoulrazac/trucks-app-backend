import {ApiProperty} from '@nestjs/swagger';
import {IsEnum, IsNotEmpty, IsOptional, IsString, MinLength} from "class-validator";

import { FINANCIAL_TYPE } from "./../../shared/constants/status.constant";


export class FinancialCategoryCreateDto {

  @ApiProperty()
  @IsNotEmpty({ message: 'Type is required' })
  @IsEnum(FINANCIAL_TYPE)
  type: FINANCIAL_TYPE;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  label: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description: string;
}
