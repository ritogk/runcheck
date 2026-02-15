import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { OptionalJwtAuthGuard } from '../../common/guards/optional-jwt-auth.guard';
import { CurrentUser, JwtPayload } from '../../common/decorators/current-user.decorator';
import { ComparisonResponseDto } from '../dto/comparison-response.dto';
import { FindComparisonUseCase } from '../use-cases/find-comparison.use-case';

@ApiTags('comparisons')
@Controller('comparisons')
export class FindComparisonController {
  constructor(private readonly findComparison: FindComparisonUseCase) {}

  @Get(':id')
  @UseGuards(OptionalJwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '比較情報を取得', operationId: 'findComparison' })
  @ApiResponse({ status: 200, type: ComparisonResponseDto })
  async handle(
    @Param('id') id: string,
    @CurrentUser() user: JwtPayload | null,
  ): Promise<ComparisonResponseDto> {
    return this.findComparison.execute(id, user);
  }
}
