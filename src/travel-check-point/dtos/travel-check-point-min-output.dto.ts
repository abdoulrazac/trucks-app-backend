import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';


export class TravelCheckPointMinOutputDto {

  @Expose()
  @ApiProperty()
  checkPointId: number;

  @Expose()
  @ApiProperty()
  travelId: number;

  @Expose()
  @ApiProperty()
  description : string;
}
