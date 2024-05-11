import {ApiProperty} from '@nestjs/swagger';
import {Expose, Type} from 'class-transformer';
import {RouteMinOutputDto} from "./route-min-output.dto";
import {UserMinOutputDto} from "../../user/dtos/user-min-output.dto";


export class RouteOutputDto {

  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  code: string;

  @Expose()
  @ApiProperty()
  label: string;

  @Expose()
  @ApiProperty()
  description: string;


  @Expose()
  @ApiProperty()
  @Type(() => RouteMinOutputDto)
  group: RouteMinOutputDto;

  @Expose()
  @ApiProperty()
  createdAt: Date;

  @Expose()
  @ApiProperty()
  updatedAt: Date;
}
