import { ApiProperty } from '@nestjs/swagger';
import {IsNotEmpty, IsNumber, IsOptional, IsString, Min} from 'class-validator';
import {Transform} from "class-transformer";

export class CategoryUpdateDto {
  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  code: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  label: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  groupId: number;
}
