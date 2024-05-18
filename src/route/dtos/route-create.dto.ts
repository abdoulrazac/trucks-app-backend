import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsOptional, IsString, MaxLength, MinLength} from "class-validator";


export class RouteCreateDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Code is required' })
  @IsString()
  @MinLength(2)
  @MaxLength(50, { message: 'Code max length is 50' })
  code: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  label: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description: string;
}
