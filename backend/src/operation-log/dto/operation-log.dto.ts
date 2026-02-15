import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { OperationCd } from '../../common/entities';

export class OperationLogDto {
  @ApiProperty({ description: '操作コード', enum: OperationCd })
  @IsEnum(OperationCd)
  operationCd: OperationCd;
}
