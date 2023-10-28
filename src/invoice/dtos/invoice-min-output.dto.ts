import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class InvoiceMinOutputDto {
  @Expose()
  @ApiProperty()
  id: number;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  numInvoice: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  status: string;

  @Expose()
  @ApiProperty()
  createdAt: Date;

  @Expose()
  @ApiProperty()
  updatedAt: Date;
}
