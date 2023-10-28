import {ApiProperty} from "@nestjs/swagger";
import {Expose} from "class-transformer";

export class CompanyMinOutputDto {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  shortname: string;

  @Expose()
  @ApiProperty()
  longname: string;
}