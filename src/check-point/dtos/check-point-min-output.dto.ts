import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';


export class CheckPointMinOutputDto {

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
  description : string;
}
