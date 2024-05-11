import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

import { transformToBoolean } from '../../shared/helpers';

export class ContractCreateDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  type: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  primePercent: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  primeTravelLimit: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  amount: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  startDate: Date; 

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsDateString()
  endDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  @Transform(({ value }) => transformToBoolean(value), { toClassOnly: true })
  @IsBoolean()
  isClosed: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  authorId: number;
}
