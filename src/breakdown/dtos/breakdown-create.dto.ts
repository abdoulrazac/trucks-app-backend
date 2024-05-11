import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';


export class BreakdownCreateDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  refBreakdown: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  type: string;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  label: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  status : string ;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  occurredAt: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  vehicleId: number;
}
