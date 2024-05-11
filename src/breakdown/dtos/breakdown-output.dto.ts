import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from "class-transformer";
import { VehicleMinOutputDto } from 'src/vehicle/dtos/vehicle-min-output.dto';

export class BreakdownOutputDto {

  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  refBreakdown: string;

  @Expose()
  @ApiProperty()
  type: string;

  @Expose()
  @ApiProperty()
  label: string;

  @Expose()
  @ApiProperty()
  status : string ;

  @Expose()
  @ApiProperty()
  description: string;

  @Expose()
  @ApiProperty()
  occurredAt: Date;

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
