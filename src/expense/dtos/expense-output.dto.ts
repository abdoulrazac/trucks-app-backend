import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from "class-transformer";

import { CategoryMinOutputDto } from "../../category/dtos/category-min-output.dto";
import { VehicleMinOutputDto } from "../../vehicle/dtos/vehicle-min-output.dto";



export class ExpenseOutputDto {

  @Expose()
  @ApiProperty()
  id: number;

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
  createdAt: Date;

  @Expose()
  @ApiProperty()
  updatedAt: Date;

  @Expose()
  @Type(() => VehicleMinOutputDto)
  @ApiProperty()
  vehicle : VehicleMinOutputDto ;
}
