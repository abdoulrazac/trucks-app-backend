import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';


export class VehicleOutputDto {

  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  numImat: string;

  @Expose()
  @ApiProperty()
  vehicleType: string;

  @Expose()
  @ApiProperty()
  vehicleColor: string;

  @Expose()
  @ApiProperty()
  brand: string;

  @Expose()
  @ApiProperty()
  vehicleModel: string;

  @Expose()
  @ApiProperty()
  volume: number;

  @Expose()
  @ApiProperty()
  axleNumber : number;

  @Expose()
  @ApiProperty()
  isAssigned: boolean;

  @Expose()
  @ApiProperty()
  createdAt: Date;

  @Expose()
  @ApiProperty()
  updatedAt: Date;
}
