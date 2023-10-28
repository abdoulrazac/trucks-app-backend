import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString
} from 'class-validator';


export class CompanyCreateDto {

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  shortname: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  longname: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  numTel: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  numPostal: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  numRccm: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  numIfu: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  taxSystem: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  taxDivision: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  avatar: string;

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  @IsString()
  email: string;
}
