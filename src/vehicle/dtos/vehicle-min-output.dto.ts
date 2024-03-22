import {ApiProperty} from '@nestjs/swagger';
import {Expose} from 'class-transformer';

export class VehicleMinOutputDto {

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
  brand: string;

  @Expose()
  @ApiProperty()
  vehicleModel: string;

  @Expose()
  @ApiProperty()
  isAssigned: boolean;
}
