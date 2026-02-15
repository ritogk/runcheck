import { Controller, Post, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { LogoutUseCase } from '../use-cases/logout.use-case';

@ApiTags('authentication')
@Controller('authentication')
export class LogoutController {
  constructor(private readonly logoutUseCase: LogoutUseCase) {}

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'ログアウト', operationId: 'logout' })
  @ApiResponse({ status: 200 })
  handle(): Record<string, never> {
    this.logoutUseCase.execute();
    return {};
  }
}
