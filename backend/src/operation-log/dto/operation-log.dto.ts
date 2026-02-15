import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { Transform } from 'class-transformer';
import { OperationCd } from '../../common/electrodb/entities/operation-log.entity';

export class OperationLogDto {
  @ApiProperty({ description: '操作コード', enum: OperationCd })
  @Transform(({ value }) => String(value))
  @IsEnum(OperationCd)
  operationCd: OperationCd;
}
