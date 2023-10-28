import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString, MinLength
} from "class-validator";


export class CategoryCreateDto {

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  label: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  description: string;
}
