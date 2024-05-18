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
  breakdownByMonthAndType : {type : string, month : string, count : number}[];

  @Expose()
  @ApiProperty()
  fileCount: number; 

  @Expose()
  @ApiProperty()
  breakdownCount: number; 
}
