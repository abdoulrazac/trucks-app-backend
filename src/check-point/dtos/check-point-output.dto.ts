import {ApiProperty} from '@nestjs/swagger';
import {Expose, Type} from 'class-transformer';

import { RouteMinOutputDto } from "./../../route/dtos/route-min-output.dto";


export class CheckPointOutputDto {

  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  rank: number;

  @Expose()
  @ApiProperty()
  label: string;

  @Expose()
  @ApiProperty()
  description: string;


  @Expose()
  @ApiProperty()
  @Type(() => RouteMinOutputDto)
  route: RouteMinOutputDto;

  @Expose()
  @ApiProperty()
  createdAt: Date;

  @Expose()
  @ApiProperty()
  updatedAt: Date;
}
