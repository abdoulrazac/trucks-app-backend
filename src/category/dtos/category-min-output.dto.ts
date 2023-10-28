import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';


export class CategoryMinOutputDto {

  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  label: string;
}
