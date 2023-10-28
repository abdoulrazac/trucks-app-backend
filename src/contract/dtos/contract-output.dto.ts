import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from "class-transformer";

import { UserMinOutputDto } from "../../user/dtos/user-min-output.dto";

export class ContractOutputDto {

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

  @Expose()
  @ApiProperty()
  description: string;

  @Expose()
  @ApiProperty()
  createdAt: Date;

  @Expose()
  @ApiProperty()
  updatedAt: Date;

  @Expose()
  @Type(() => UserMinOutputDto)
  @ApiProperty()
  author : UserMinOutputDto ;
}
