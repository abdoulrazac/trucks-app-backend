import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { UserMinOutputDto } from '../../user/dtos/user-min-output.dto';
import { CompanyMinOutputDto } from '../../company/dtos/company-min-output.dto';
import { VehicleMinOutputDto } from '../../vehicle/dtos/vehicle-min-output.dto';
import { ExpenseMinOutputDto } from '../../expense/dtos/expense-min-output.dto';
import { InvoiceMinOutputDto } from '../../invoice/dtos/invoice-min-output.dto';
import { TravelMinOutputDto } from '../../travel/dtos/travel-min-output.dto';

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
  type: string;

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
  createdAt: Date;

  @Expose()
  @ApiProperty()
  updatedAt: Date;
}
