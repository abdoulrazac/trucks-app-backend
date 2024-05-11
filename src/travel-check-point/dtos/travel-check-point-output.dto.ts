import {ApiProperty} from '@nestjs/swagger';
import {Expose, Type} from 'class-transformer';

import { CheckPointMinOutputDto } from "./../../check-point/dtos/check-point-min-output.dto";


export class TravelCheckPointOutputDto {

  @Expose()
  @ApiProperty()
  checkPointId: number;

  @Expose()
  @ApiProperty()
  travelId: number;

  @Expose()
  @ApiProperty()
  description: string;

  @Expose()
  @ApiProperty()
  @Type(() => CheckPointMinOutputDto)
  checkPoint: CheckPointMinOutputDto;

  @Expose()
  @ApiProperty()
  createdAt: Date;

  @Expose()
  @ApiProperty()
  updatedAt: Date;
}
