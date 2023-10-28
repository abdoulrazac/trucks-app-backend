import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';


export class CompanyOutputDto {

  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  shortname: string;

  @Expose()
  @ApiProperty()
  longname: string;

  @Expose()
  @ApiProperty()
  address: string;

  @Expose()
  @ApiProperty()
  numTel: string;

  @Expose()
  @ApiProperty()
  numPostal: string;

  @Expose()
  @ApiProperty()
  numRccm: string;

  @Expose()
  @ApiProperty()
  numIfu: string;

  @Expose()
  @ApiProperty()
  taxSystem: string;

  @Expose()
  @ApiProperty()
  taxDivision: string;

  @Expose()
  @ApiProperty()
  avatar: string;

  @Expose()
  @ApiProperty()
  email: string;

  @Expose()
  @ApiProperty()
  createdAt: string;

  @Expose()
  @ApiProperty()
  updatedAt: string;
}
