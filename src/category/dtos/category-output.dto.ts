import {ApiProperty} from '@nestjs/swagger';
import {Expose, Type} from 'class-transformer';
import {CategoryMinOutputDto} from "./category-min-output.dto";
import {UserMinOutputDto} from "../../user/dtos/user-min-output.dto";


export class CategoryOutputDto {

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
  @Type(() => CategoryMinOutputDto)
  group: CategoryMinOutputDto;

  @Expose()
  @ApiProperty()
  createdAt: Date;

  @Expose()
  @ApiProperty()
  updatedAt: Date;
}
