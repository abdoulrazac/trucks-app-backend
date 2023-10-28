import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { TravelMinOutputDto } from '../../travel/dtos/travel-min-output.dto';

export class InvoiceUpdateDto {
  @ApiProperty()
  @IsOptional()
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
  @IsArray()
  @Type(() => TravelMinOutputDto)
  travels: TravelMinOutputDto[];

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  companyId: number;
}
