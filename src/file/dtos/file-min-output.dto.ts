import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class FileMinOutputDto {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  label: string;

  @Expose()
  @ApiProperty()
  categories: string[];

  @Expose()
  @ApiProperty()
  extension: string;

  @Expose()
  @ApiProperty()
  size: number;
}
