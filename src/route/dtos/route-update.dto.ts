import { ApiProperty } from '@nestjs/swagger';
import {Transform} from "class-transformer";
import {IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, Min, MinLength} from 'class-validator';

export class RouteUpdateDto {
  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(20, { message: 'Code max length is 20' })
  code: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  label: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  description: string;
}
