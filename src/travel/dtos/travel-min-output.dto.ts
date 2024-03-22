import {ApiProperty} from '@nestjs/swagger';
import {Expose} from 'class-transformer';

import {TRAVEL_STATUS} from "../../shared/constants";

export class TravelMinOutputDto {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  refTravel: string;

  @Expose()
  @ApiProperty()
  status: TRAVEL_STATUS;
}

