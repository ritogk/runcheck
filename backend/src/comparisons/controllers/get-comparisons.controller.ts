import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser, JwtPayload } from '../../common/decorators/current-user.decorator';
import { ComparisonResponseDto } from '../dto/comparison-response.dto';
import { GetComparisonsUseCase } from '../use-cases/get-comparisons.use-case';

@ApiTags('comparisons')
@Controller('comparisons')
export class GetComparisonsController {
  constructor(private readonly getComparisons: GetComparisonsUseCase) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '比較情報一覧を取得', operationId: 'getComparisons' })
  @ApiResponse({ status: 200, type: [ComparisonResponseDto] })
  async handle(
    @CurrentUser() user: JwtPayload,
  ): Promise<ComparisonResponseDto[]> {
    return this.getComparisons.execute(user);
  }
}
