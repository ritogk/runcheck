import { Controller, Put, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { OperationLogDto } from '../dto/operation-log.dto';
import { UpdateOperationLogUseCase } from '../use-cases/update-operation-log.use-case';

@ApiTags('operationLog')
@Controller('operation-log')
export class UpdateOperationLogController {
  constructor(private readonly updateOperationLog: UpdateOperationLogUseCase) {}

  @Put()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: '操作ログを送信', operationId: 'updateOperationLog' })
  @ApiResponse({ status: 201 })
  async handle(@Body() dto: OperationLogDto): Promise<Record<string, never>> {
    await this.updateOperationLog.execute(dto.operationCd);
    return {};
  }
}
