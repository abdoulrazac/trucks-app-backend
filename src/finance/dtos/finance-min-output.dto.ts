import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class FinanceMinOutputDto {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  transactionRef: string;

  @Expose()
  @ApiProperty()
  type: string;

  @Expose()
  @ApiProperty()
  label: string;

  @Expose()
  @ApiProperty()
  unitPrice: number;

  @Expose()
  @ApiProperty()
  unitNumber: number;

  @Expose()
  @ApiProperty()
  transactionDate: Date;
}
