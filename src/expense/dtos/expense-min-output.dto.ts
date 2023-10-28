import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ExpenseMinOutputDto {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  label: string;

  @Expose()
  @ApiProperty()
  unitPrice: number;

  @Expose()
  @ApiProperty()
  unitNumber: number;
}
