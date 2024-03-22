import {ApiProperty} from '@nestjs/swagger';
import {IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, Min} from "class-validator";
import {Transform} from "class-transformer";
import {transformToBoolean} from '../../shared/helpers';
import {VEHICLE_STATUS} from "../../shared/constants";

export class TruckUpdateDto { 

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @Transform(
    ({ value }) => transformToBoolean(value),
    { toClassOnly: true },
  )
  @IsBoolean()
  isClosed: boolean;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsEnum(VEHICLE_STATUS)
  status: VEHICLE_STATUS;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  conductorId : number ;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  tractorId : number;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  semiTrailerId : number ;
}
