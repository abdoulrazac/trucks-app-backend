import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class FinanceStatsOutputDto {
  @Expose()
  @ApiProperty()
  transactionCountByMonthType : {month: string, type: string, count: number}[];

  @Expose()
  @ApiProperty()
  transactionValueByMonthType : {month: string, type: string, total: number}[];

  @Expose()
  @ApiProperty()
  transactionValueByType : {type: string, total: number}[];
}
