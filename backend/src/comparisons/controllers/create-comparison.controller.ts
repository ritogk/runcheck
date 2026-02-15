import { Controller, Post, Body, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { OptionalJwtAuthGuard } from '../../common/guards/optional-jwt-auth.guard';
import { CurrentUser, JwtPayload } from '../../common/decorators/current-user.decorator';
import { CreateComparisonDto } from '../dto/create-comparison.dto';
import { CreateComparisonResponseDto } from '../dto/create-comparison-response.dto';
import { CreateComparisonUseCase } from '../use-cases/create-comparison.use-case';

@ApiTags('comparisons')
@Controller('comparisons')
export class CreateComparisonController {
  constructor(private readonly createComparison: CreateComparisonUseCase) {}

  @Post()
  @UseGuards(OptionalJwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @ApiOperation({ summary: '比較情報を登録' })
  @ApiResponse({ status: 201, type: CreateComparisonResponseDto })
  async handle(
    @Body() dto: CreateComparisonDto,
    @CurrentUser() user: JwtPayload | null,
  ): Promise<CreateComparisonResponseDto> {
    return this.createComparison.execute(dto, user);
  }
}
