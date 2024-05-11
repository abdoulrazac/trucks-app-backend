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
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  numTel: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  numPostal: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  country: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  numRccm: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  numIfu: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  taxSystem: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  taxDivision: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  avatar: string;
}
