import {ApiProperty} from '@nestjs/swagger';
import {Expose, Type} from "class-transformer";

import {VehicleMinOutputDto} from "../../vehicle/dtos/vehicle-min-output.dto";
import {UserMinOutputDto} from "../../user/dtos/user-min-output.dto";
import {VEHICLE_STATUS} from "../../shared/constants";


export class TruckOutputDto {

  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  description : string;

  @Expose()
  @ApiProperty()
  isClosed : boolean ;

  @Expose()
  @ApiProperty()
  status: VEHICLE_STATUS;

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
