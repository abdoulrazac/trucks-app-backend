import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import {Transform} from "class-transformer";
import {IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, Min, MinLength} from "class-validator";


export class CategoryCreateDto {

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
  @MinLength(5)
  description: string;


  @IsOptional()
  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  groupId: number;
}
