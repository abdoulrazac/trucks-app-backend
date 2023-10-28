import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CompanyParamDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  shortname: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  longname: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  address: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  numTel: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  numPostal: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  numRccm: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  numIfu: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  taxSystem: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  taxDivision: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  avatar: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEmail()
  @IsString()
  email: string;

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
