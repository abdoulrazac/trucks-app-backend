import { ApiProperty } from '@nestjs/swagger';
import { Expose } from "class-transformer";

export class ContractMinOutputDto {

  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  type: string;

  @Expose()
  @ApiProperty()
  primePercent: number;

  @Expose()
  @ApiProperty()
  primeTravelLimit: number;

  @Expose()
  @ApiProperty()
  amount: string;

  @Expose()
  @ApiProperty()
  startDate: Date;

  @Expose()
  @ApiProperty()
  endDate: Date;

  @Expose()
  @ApiProperty()
  isClosed: boolean;
}
