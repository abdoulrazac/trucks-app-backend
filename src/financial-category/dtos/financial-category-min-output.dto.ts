import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';


export class FinancialCategoryMinOutputDto {

  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  type : string;

  @Expose()
  @ApiProperty()
  label: string;
}
