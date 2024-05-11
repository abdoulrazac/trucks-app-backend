import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserMinOutputDto {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  name: string;

  @Expose()
  @ApiProperty()
  username: string;

  @Expose()
  @ApiProperty()
  numTel: string;

  @Expose()
  @ApiProperty()
  refDriver: string;

  @Expose()
  @ApiProperty()
  email: string;

  @Expose()
  @ApiProperty()
  isAssigned: boolean;
}
