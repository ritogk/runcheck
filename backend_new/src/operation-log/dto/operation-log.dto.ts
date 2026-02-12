import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min, Max } from 'class-validator';

export class OperationLogDto {
  @ApiProperty({ description: '操作コード (1-30)', minimum: 1, maximum: 30 })
  @IsInt()
  @Min(1)
  @Max(30)
  operationCd: number;
}
