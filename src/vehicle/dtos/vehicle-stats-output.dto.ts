import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { FileOutputDto } from '../../file/dtos/file-output.dto';


export class VehicleStatsOutputDto {
  @Expose()
  @ApiProperty()
  lastInsurance: FileOutputDto;

  @Expose()
  @ApiProperty()
  lastCcva: FileOutputDto;

  @Expose()
  @ApiProperty()
  breakdownByType : {type : string, count : number}[];

  @Expose()
  @ApiProperty()
  breakdownByMonth : {month : string, count : number}[];

  @Expose()
  @ApiProperty()
  fileNumber: number;
}
