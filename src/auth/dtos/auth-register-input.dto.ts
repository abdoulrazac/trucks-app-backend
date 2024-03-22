import {ApiProperty} from '@nestjs/swagger';

import {IsBoolean, IsEmail, IsNotEmpty, IsString, Length, MaxLength,} from 'class-validator';
import {Transform} from 'class-transformer';
import {transformToBoolean} from '../../shared/helpers';
import {ROLE} from '../../shared/constants';

export class RegisterInput {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(100)
  @IsString()
  name: string;

  @ApiProperty()
  @MaxLength(200)
  @IsString()
  username: string;

  @ApiProperty()
  @MaxLength(200)
  @IsString()
  numTel: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(6, 100)
  @IsString()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(100)
  email: string;

  // These keys can only be set by ADMIN user.
  roles: ROLE[] = [ROLE.CONDUCTOR];



  @ApiProperty()
  @IsNotEmpty()
  @Transform(
    ({ value }) => transformToBoolean(value),
    { toClassOnly: true },
  )
  @IsBoolean()
  isAccountDisabled: boolean;
}
