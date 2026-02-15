import { Controller, Put, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { OperationLogDto } from './dto/operation-log.dto';
import { UpdateOperationLogUseCase } from './use-cases/update-operation-log.use-case';

@ApiTags('operationLog')
@Controller('operation-log')
export class OperationLogController {
  constructor(private readonly updateOperationLog: UpdateOperationLogUseCase) {}

  @Put()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: '操作ログを送信' })
  @ApiResponse({ status: 201 })
  async update(@Body() dto: OperationLogDto): Promise<Record<string, never>> {
    await this.updateOperationLog.execute(dto.operationCd);
    return {};
  }
}
