import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export enum OrderColumn {
  name = 'name',
  username = 'username',
  roles = 'roles',
  status = 'status',
  numTel = 'numTel',
  email = 'email',
  refDriver = 'refDriver',
  dateDriver = 'dateDriver',
  isAccountDisabled = 'isAccountDisabled',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
}

export class UserOrderDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsEnum(OrderColumn)
  orderByDesc: OrderColumn;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsEnum(OrderColumn)
  orderByAsc: OrderColumn;
}
