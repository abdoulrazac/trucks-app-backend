import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';


export class RouteMinOutputDto {

  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  code : string;

  @Expose()
  @ApiProperty()
  label: string;
}
