import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import {Transform} from 'class-transformer';
import {
  IsBoolean,
  IsBooleanString,
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
  Matches,
  MaxLength,
} from 'class-validator';
import {transformToBoolean} from 'src/shared/helpers';

import {ACCOUNT_STATUS, ROLE} from '../../shared/constants';

export class UserCreateDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Length(4, 100)
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(6, 100)
  @Matches('^[a-zA-Z0-9][a-zA-Z0-9_\\-\\.]{2,28}[a-zA-Z0-9]$')
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(6, 100)
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsPhoneNumber('BF')
  numTel: string;

  @ApiProperty()
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

  @ApiProperty({ example: [ROLE.CONDUCTOR, ROLE.ACCOUNTANT, ROLE.MANAGER] })
  @IsNotEmpty()
  roles: ROLE[];

  @ApiProperty({ example: ACCOUNT_STATUS.WORK })
  @IsNotEmpty()
  @IsEnum(ACCOUNT_STATUS)
  status: ACCOUNT_STATUS;

  @ApiProperty()
  @IsNotEmpty()
  @Transform(
    ({ value }) => transformToBoolean(value),
    { toClassOnly: true },
  )
  @IsBoolean()
  isAccountDisabled: boolean;
}
