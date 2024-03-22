import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CompanyUpdateDto {
  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  shortname: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  longname: string;

  @ApiProperty()
  @IsOptional()
  @IsOptional()
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  numTel: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsOptional() 
  @IsNotEmpty()
  @IsString()
  numPostal: string;

  @ApiProperty()
  @IsOptional() 
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  numRccm: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  numIfu: string;

  @ApiProperty()
  @IsOptional()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  taxSystem: string;

  @ApiProperty()
  @IsOptional()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  taxDivision: string;

  @ApiProperty()
  @IsOptional()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  avatar: string;
}
