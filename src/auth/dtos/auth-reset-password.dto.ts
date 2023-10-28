import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ResetPasswordRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username: string;
}

export class ResetPasswordDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

export class ResetPasswordOutputDto {
  @Expose()
  @ApiProperty()
  username : string

  @Expose()
  @ApiProperty()
  message : string
}
