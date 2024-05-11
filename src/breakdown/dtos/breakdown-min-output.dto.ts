import { ApiProperty } from '@nestjs/swagger';
import { Expose } from "class-transformer";

export class BreakdownMinOutputDto {

  @Expose()
  @ApiProperty()
  id: number;

  
  @Expose()
  @ApiProperty()
  refBreakdown: string;

  
  @Expose()
  @ApiProperty()
  type: string;
  
  
  @Expose()
  @ApiProperty()
  label: string;

  
  @Expose()
  @ApiProperty()
  status : string ;

  
  @Expose()
  @ApiProperty()
  description: string;

  @Expose()
  @ApiProperty()
  occurredAt: Date;
}
