import {ApiProperty} from '@nestjs/swagger';
import {Expose, Type} from "class-transformer";

import {CompanyMinOutputDto} from "../../company/dtos/company-min-output.dto";
import {TruckOutputDto} from "../../truck/dtos/truck-output.dto";
import {InvoiceMinOutputDto} from "../../invoice/dtos/invoice-min-output.dto";
import {TRAVEL_STATUS} from "../../shared/constants";

export class TravelOutputDto {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  refTravel: string;

  @Expose()
  @ApiProperty()
  signatureDate :  Date;

  @Expose()
  @ApiProperty()
  status: TRAVEL_STATUS;

  @Expose()
  @ApiProperty()
  product: string;

  @Expose()
  @ApiProperty()
  departureDate: Date;

  @Expose()
  @ApiProperty()
  arrivalDate: Date;

  @Expose()
  @ApiProperty()
  departureCity: string;

  @Expose()
  @ApiProperty()
  arrivalCity: string ;

  @Expose()
  @ApiProperty()
  departureWeight: number ;

  @Expose()
  @ApiProperty()
  arrivalWeight: number ;

  @Expose()
  @ApiProperty()
  createdAt: string;

  @Expose()
  @ApiProperty()
  updatedAt: string;

  @Expose()
  @ApiProperty()
  @Type( () => CompanyMinOutputDto)
  company: CompanyMinOutputDto ;

  @Expose()
  @ApiProperty()
  @Type( () => InvoiceMinOutputDto)
  invoice: InvoiceMinOutputDto;

  @Expose()
  @ApiProperty()
  @Type( () => TruckOutputDto)
  truck: TruckOutputDto ;
}
