import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class VehicleMinOutputDto {

  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  numImat: string;

  @Expose()
  @ApiProperty()
  type: string;

  @Expose()
  @ApiProperty()
  isAssigned: boolean;
}
