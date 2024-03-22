import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import {
  IsBoolean,
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

import {ACCOUNT_STATUS, ROLE} from '../../shared/constants';
import {Transform} from 'class-transformer';
import {transformToBoolean} from 'src/shared/helpers';

export class UserCreateDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(6, 100)
  @Matches('^[a-zA-Z0-9_\\-\\.]{4,20}[a-zA-Z0-9]$')
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
