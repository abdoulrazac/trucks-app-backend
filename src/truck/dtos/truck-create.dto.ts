import {ApiProperty} from '@nestjs/swagger';
import {Transform} from "class-transformer";
import {IsEnum, IsNotEmpty, IsNumber, Min} from "class-validator";
import {VEHICLE_STATUS} from "../../shared/constants";


export class TruckCreateDto { 

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(VEHICLE_STATUS)
  status: VEHICLE_STATUS;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  conductorId : number ;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  tractorId : number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  semiTrailerId : number ;
}
