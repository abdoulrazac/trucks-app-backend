import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString, Length } from 'class-validator';

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
  @Length(6, 100)
  @IsString()
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
