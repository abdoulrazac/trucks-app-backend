import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDateString, 
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

import { ROLE } from '../../shared/constants';
import { transformToBoolean } from '../../shared/helpers';

export class UserParamDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  username: string;

  @ApiPropertyOptional({ example: [ROLE.CONDUCTOR] })
  @IsOptional()
  @IsNotEmpty()
  roles: ROLE[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  status: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  numTel: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  email: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  refDriver: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsDateString()
  dateDriver: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(
    ({ value }) => transformToBoolean(value),
    { toClassOnly: true },
  )
  @IsBoolean()
  isAccountDisabled: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(
    ({ value }) => transformToBoolean(value),
    { toClassOnly: true },
  )
  @IsBoolean()
  isAssigned: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  createdAt: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  updatedAt: string;
}
