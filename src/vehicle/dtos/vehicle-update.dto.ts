import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";
import { Transform } from "class-transformer";

export class VehicleUpdateDto {

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  numImat: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  vehicleType: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  vehicleColor: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  brand: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  vehicleModel: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  volume: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(5)
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  axleNumber : number;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isAssigned: boolean ;
}
