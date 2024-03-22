import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import {IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength} from "class-validator";
import {Transform} from "class-transformer";


export class CategoryCreateDto {

  @ApiProperty()
  @IsNotEmpty({ message: 'Code is required' })
  @IsString()
  @MaxLength(20, { message: 'Code max length is 20' })
  code: string;

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


  @IsOptional()
  @ApiPropertyOptional()
  @IsNotEmpty()
  @Transform(({ value }) => {
    parseInt(value, 10)
  }, { toClassOnly: true })
  @IsNumber()
  groupId: number;

}
