import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer'
import {
  ArrayNotEmpty, 
  IsArray,
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
  MaxLength,
} from 'class-validator';

import { ACCOUNT_STATUS,ROLE } from '../../shared/constants';
import { transformToBoolean } from '../../shared/helpers'

export class UserUpdateDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(100)
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @Matches('^[a-zA-Z0-9_\\-\\.]{4,20}[a-zA-Z0-9]$')
  username: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Length(6, 100)
  password: string;
  
  @ApiPropertyOptional()
  @IsOptional()
  @IsNotEmpty()
  @Transform(
    ({ value }) => transformToBoolean(value),
    { toClassOnly: true },
  )
  @IsBoolean()
  isAssigned: boolean;

  @ApiProperty()
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.split(',');
    }
    return value;
  })
  @IsNotEmpty()
  roles: ROLE[];

  @ApiProperty({ example: ACCOUNT_STATUS.WORK })
  @IsOptional()
  @IsEnum(ACCOUNT_STATUS)
  status: ACCOUNT_STATUS;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  numTel: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(100)
  email: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Length(4, 100)
  refDriver: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsDateString()
  dateDriver: Date; 

  @ApiProperty()
  @IsOptional()
  @Transform(
    ({ value }) => transformToBoolean(value),
    { toClassOnly: true },
  )
  @IsBoolean()
  isAccountDisabled: boolean;
}
