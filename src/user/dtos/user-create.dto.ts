import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
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

import { ROLE } from '../../auth/constants/role.constant';
import { ACCOUNT_STATUS } from '../../auth/constants/status.constant';
import { Transform } from 'class-transformer';

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
  @Transform(
    ({ value }) => {
      if (value === 'true' || value === '1' || value === true) return true;
      if (value === 'false' || value === '0' || value === false) return false;
      return null;
    },
    { toClassOnly: true },
  )
  @IsNotEmpty()
  @IsBoolean()
  isAccountDisabled: boolean;
}
