import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { TravelMinOutputDto } from 'src/travel/dtos/travel-min-output.dto';

export class InvoiceCreateDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  numInvoice: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  unitPriceExtern: number;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  unitPriceIntern: number;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  valueTva: number;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  valueRetain: number;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  status: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  companyId: number;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  @IsNotEmpty() 
  @Type(() => TravelMinOutputDto)
  travels: TravelMinOutputDto[];
}
