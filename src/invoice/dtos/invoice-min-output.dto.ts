import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class InvoiceMinOutputDto {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  invoiceDate: Date;

  @Expose()
  @ApiProperty()
  description: string;

  @Expose()
  @ApiProperty()
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
