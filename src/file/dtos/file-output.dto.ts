import { ApiProperty } from '@nestjs/swagger';
import {Expose, Transform, Type} from 'class-transformer';
import { ContractMinOutputDto } from 'src/contract/dtos/contract-min-output.dto';

import { BreakdownMinOutputDto } from '../../breakdown/dtos/breakdown-min-output.dto';
import { CompanyMinOutputDto } from '../../company/dtos/company-min-output.dto';
import { ExpenseMinOutputDto } from '../../expense/dtos/expense-min-output.dto';
import { InvoiceMinOutputDto } from '../../invoice/dtos/invoice-min-output.dto';
import { TravelMinOutputDto } from '../../travel/dtos/travel-min-output.dto';
import { UserMinOutputDto } from '../../user/dtos/user-min-output.dto';
import { VehicleMinOutputDto } from '../../vehicle/dtos/vehicle-min-output.dto';

export class FileOutputDto {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  label: string;

  @Expose()
  @ApiProperty()
  description: string;

  @Expose()
  @ApiProperty()
  notification: boolean;

  @Expose()
  @ApiProperty()
  categories: string[];


  @Expose()
  @ApiProperty()
  @Transform(({ value }) => new Date(value) < new Date('1990-01-01') ? null : new Date(value), { toClassOnly: true })
  deliverAt: Date;

  @Expose()
  @ApiProperty()
  @Transform(({ value }) => new Date(value) < new Date('1990-01-01') ? null : new Date(value), { toClassOnly: true })
  expireAt: Date;

  @Expose()
  @ApiProperty()
  extension: string;

  @Expose()
  @ApiProperty()
  size: number;

  @Expose()
  @ApiProperty()
  @Type(() => UserMinOutputDto)
  author: UserMinOutputDto;

  @Expose()
  @ApiProperty()
  @Type(() => CompanyMinOutputDto)
  company: CompanyMinOutputDto;

  @Expose()
  @ApiProperty()
  @Type(() => ExpenseMinOutputDto)
  expense: CompanyMinOutputDto;

  @Expose()
  @ApiProperty()
  @Type(() => VehicleMinOutputDto)
  vehicle: VehicleMinOutputDto;

  @Expose()
  @ApiProperty()
  @Type(() => TravelMinOutputDto)
  travel: TravelMinOutputDto;

  @Expose()
  @ApiProperty()
  @Type(() => InvoiceMinOutputDto)
  invoice: InvoiceMinOutputDto;

  @Expose()
  @ApiProperty()
  @Type(() => ContractMinOutputDto)
  contract : ContractMinOutputDto;

  @Expose()
  @ApiProperty()
  @Type(() => BreakdownMinOutputDto)
  breakdown : BreakdownMinOutputDto;



  @Expose()
  @ApiProperty()
  createdAt: Date;

  @Expose()
  @ApiProperty()
  updatedAt: Date;
}
