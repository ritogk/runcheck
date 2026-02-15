import { Controller, Put, Param, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { OptionalJwtAuthGuard } from '../../common/guards/optional-jwt-auth.guard';
import { CurrentUser, JwtPayload } from '../../common/decorators/current-user.decorator';
import { PublishComparisonUseCase } from '../use-cases/publish-comparison.use-case';

@ApiTags('comparisons')
@Controller('comparisons')
export class PublishComparisonController {
  constructor(private readonly publishComparison: PublishComparisonUseCase) {}

  @Put(':id/publish')
  @UseGuards(OptionalJwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: '比較情報を公開状態にする' })
  @ApiResponse({ status: 200 })
  async handle(
    @Param('id') id: string,
    @CurrentUser() user: JwtPayload | null,
  ): Promise<Record<string, never>> {
    await this.publishComparison.execute(id, user);
    return {};
  }
}
