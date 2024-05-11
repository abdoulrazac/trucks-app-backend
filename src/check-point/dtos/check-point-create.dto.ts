import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import {Transform} from "class-transformer";
import {IsNotEmpty, IsNumber, IsOptional, IsString, Min, MinLength} from "class-validator";


export class CheckPointCreateDto {

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

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  rank: number;


  @IsOptional()
  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  routeId: number;
}
