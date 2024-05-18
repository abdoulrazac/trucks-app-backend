import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from "class-transformer";
import {
  IsDateString,
  IsEnum,
  IsNotEmpty, IsNumber,
  IsOptional,
  IsString, Min, MinLength
} from "class-validator";

import { FINANCIAL_TYPE } from '../../shared/constants';


export class FinanceCreateDto {

  @ApiProperty()
  @IsNotEmpty()
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

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => parseFloat(value), { toClassOnly: true })
  unitPrice : number ;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  unitNumber : number ;

  @ApiProperty()
  @IsNotEmpty()
  categories : string[];
  
  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  transactionDate: Date; 

  @ApiPropertyOptional()
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  vehicleId : number ;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  breakdownId : number ;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  invoiceId : number ;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  userId : number ;
}
