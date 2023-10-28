import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from "class-transformer";

import { CategoryMinOutputDto } from "../../category/dtos/category-min-output.dto";
import { VehicleMinOutputDto } from "../../vehicle/dtos/vehicle-min-output.dto";
import { UserMinOutputDto } from "../../user/dtos/user-min-output.dto";



export class TruckOutputDto {

  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  isClosed : boolean ;

  @Expose()
  @ApiProperty()
  status : string;

  @Expose()
  @ApiProperty()
  createdAt: Date;

  @Expose()
  @ApiProperty()
  updatedAt: Date;

  @Expose()
  @Type(() => UserMinOutputDto)
  @ApiProperty()
  conductor : UserMinOutputDto;

  @Expose()
  @Type(() => VehicleMinOutputDto)
  @ApiProperty()
  tractor : VehicleMinOutputDto ;

  @Expose()
  @Type(() => VehicleMinOutputDto)
  @ApiProperty()
  semiTrailer : VehicleMinOutputDto ;
}
