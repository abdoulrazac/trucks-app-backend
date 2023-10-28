import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class TravelMinOutputDto {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  refTravel: string;

  @Expose()
  @ApiProperty()
  status: string;
}
