import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class BufferOutputDto {
  @ApiPropertyOptional({
    type: Buffer,
  })
  @IsOptional()
  buffer: Buffer;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  name: string;
}
