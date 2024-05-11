import { ApiProperty } from '@nestjs/swagger';
import { Transform } from "class-transformer";
import {
  IsEnum,
  IsNotEmpty, IsNumber, IsOptional,
  IsString, Max, Min
} from "class-validator";
import { VEHICLE_TYPE } from 'src/shared/constants';


export class VehicleCreateDto {

  @ApiProperty({description : "Numéro d'immatriculation du véhicule"})
  @IsNotEmpty({message : 'Veuillez saisir un numImat'})
  @IsString({message : 'Veuillez saisir un numImat'})
  numImat: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(VEHICLE_TYPE)
  vehicleType: VEHICLE_TYPE;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  vehicleColor: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  brand: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  vehicleModel: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  volume: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(5)
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  axleNumber : number;
}
