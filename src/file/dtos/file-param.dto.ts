import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import {Transform} from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { transformToBoolean } from 'src/shared/helpers';

export class FileParamDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString() 
  label: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty()
  @IsOptional()
  @Transform(
    ({ value }) => transformToBoolean(value),
    { toClassOnly: true },
  )
  @IsBoolean()
  notification: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  categories: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  deliverAt: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  expireAt: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  extension: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  authorId: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  companyId: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  expenseId: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  vehicleId: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  travelId: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  invoiceId: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  contractId: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  breakdownId: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  @IsDateString()
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  createdAt: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  updatedAt: string;
}
