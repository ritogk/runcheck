import { Controller, Delete, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser, JwtPayload } from '../../common/decorators/current-user.decorator';
import { DeleteComparisonUseCase } from '../use-cases/delete-comparison.use-case';

@ApiTags('comparisons')
@Controller('comparisons')
export class DeleteComparisonController {
  constructor(private readonly deleteComparison: DeleteComparisonUseCase) {}

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '比較情報を削除', operationId: 'deleteComparison' })
  @ApiResponse({ status: 200 })
  async handle(
    @Param('id') id: string,
    @CurrentUser() user: JwtPayload,
  ): Promise<void> {
    await this.deleteComparison.execute(id, user);
  }
}
