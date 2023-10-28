import { ApiProperty } from '@nestjs/swagger';
import { Transform } from "class-transformer";
import {
  IsBoolean,
  IsNotEmpty, IsNumber, IsString,
  Min
} from "class-validator";


export class TruckCreateDto {

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  isClosed : boolean ;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  status : string ;

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
