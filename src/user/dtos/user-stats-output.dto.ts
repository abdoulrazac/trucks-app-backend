import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { ContractOutputDto } from 'src/contract/dtos/contract-output.dto';

export class UserStatsOutputDto {
  @Expose()
  @ApiProperty()
  travelByMonth : { month: string, count: number }[];

  @Expose()
  @ApiProperty()
  travelCount: number;

  @Expose()
  @ApiProperty()
  fileCount: number;
  
  @Expose()
  @ApiProperty()
  lastContract: ContractOutputDto;
}
