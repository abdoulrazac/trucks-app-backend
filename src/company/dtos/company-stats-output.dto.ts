import {ApiProperty} from "@nestjs/swagger";
import {Expose} from "class-transformer";

export class CompanyStatsOutputDto {
  @Expose()
  @ApiProperty()
  travelCountByMonth : {month: string, count: number}[];

  @Expose()
  @ApiProperty()
  travelCount : number;

  @Expose()
  @ApiProperty()
  invoiceCountByStatus : {status: string, count: number}[];
}