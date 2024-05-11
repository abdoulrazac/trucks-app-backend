import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsString, MaxLength, MinLength} from "class-validator";


export class RouteCreateDto {

  @ApiProperty()
  @IsNotEmpty({ message: 'Code is required' })
  @IsString()
  @MinLength(2)
  @MaxLength(20, { message: 'Code max length is 20' })
  code: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  label: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  description: string;
}
