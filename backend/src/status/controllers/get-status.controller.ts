import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { OptionalJwtAuthGuard } from '../../common/guards/optional-jwt-auth.guard';
import { CurrentUser, JwtPayload } from '../../common/decorators/current-user.decorator';
import { StatusResponseDto } from '../dto/status-response.dto';
import { GetStatusUseCase } from '../use-cases/get-status.use-case';

@ApiTags('status')
@Controller('status')
export class GetStatusController {
  constructor(private readonly getStatus: GetStatusUseCase) {}

  @Get()
  @UseGuards(OptionalJwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '未ログインユーザーも含めたユーザーの状態を取得', operationId: 'getStatus' })
  @ApiResponse({ status: 200, type: StatusResponseDto })
  async handle(@CurrentUser() user: JwtPayload | null): Promise<StatusResponseDto> {
    return this.getStatus.execute(user);
  }
}
