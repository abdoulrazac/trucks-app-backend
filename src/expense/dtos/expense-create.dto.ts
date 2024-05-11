import { ApiProperty } from '@nestjs/swagger';
import { Transform } from "class-transformer";
import {
  IsNotEmpty, IsNumber,
  IsString, Min, MinLength
} from "class-validator";


export class ExpenseCreateDto {

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  label: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  unitPrice : number ;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  unitNumber : number ;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  categories : string[];

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  vehicleId : number ;
}
