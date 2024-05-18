import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from "class-transformer";

import { CategoryMinOutputDto } from "../../category/dtos/category-min-output.dto";
import { VehicleMinOutputDto } from "../../vehicle/dtos/vehicle-min-output.dto";
import { BreakdownMinOutputDto } from "./../../breakdown/dtos/breakdown-min-output.dto";
import { UserMinOutputDto } from "./../../user/dtos/user-min-output.dto";



export class FinanceOutputDto {

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
  description: string;

  @Expose()
  @ApiProperty()
  unitPrice : number ;

  @Expose()
  @ApiProperty()
  unitNumber : number ;

  @Expose()
  @ApiProperty()
  categories : CategoryMinOutputDto[];

  @Expose()
  @ApiProperty()
  transactionDate: Date;

  @Expose()
  @ApiProperty()
  createdAt: Date;

  @Expose()
  @ApiProperty()
  updatedAt: Date;

  @Expose()
  @ApiProperty()
  @Type(() => VehicleMinOutputDto)
  vehicle : VehicleMinOutputDto ;

  @Expose()
  @ApiProperty()
  @Type(() => BreakdownMinOutputDto)
  breakdown : BreakdownMinOutputDto ;

  @Expose()
  @ApiProperty()
  @Type(() => UserMinOutputDto)
  user : UserMinOutputDto ;
  

  @Expose()
  @ApiProperty()
  @Type(() => BreakdownMinOutputDto)
  invoice : BreakdownMinOutputDto ;
}
