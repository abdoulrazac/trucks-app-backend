import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';


export class DashboardStatsOutputDto {
  @Expose()
  @ApiProperty()
  invoiceCountByStatus : {status : string, count : number}[];

  @Expose()
  @ApiProperty()
  transactionValueByType : {type : string, total : number}[];

  @Expose()
  @ApiProperty()
  travelCountByStatus : {status : string, count : number}[];

  @Expose()
  @ApiProperty()
  userCount : number; 

  @Expose()
  @ApiProperty()
  transactionValueByMonthType : {month : string, type : string, total : number}[];

  @Expose()
  @ApiProperty()
  breakdownCountByStatus : {status : string, count : number}[];
}
