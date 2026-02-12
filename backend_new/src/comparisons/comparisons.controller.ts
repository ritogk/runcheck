import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { OptionalJwtAuthGuard } from '../common/guards/optional-jwt-auth.guard';
import { CurrentUser, JwtPayload } from '../common/decorators/current-user.decorator';
import {
  CreateComparisonDto,
  ComparisonResponseDto,
  CreateComparisonResponseDto,
} from './dto/create-comparison.dto';
import { CreateComparisonUseCase } from './use-cases/create-comparison.use-case';
import { FindComparisonUseCase } from './use-cases/find-comparison.use-case';
import { GetComparisonsUseCase } from './use-cases/get-comparisons.use-case';
import { PublishComparisonUseCase } from './use-cases/publish-comparison.use-case';
import { DeleteComparisonUseCase } from './use-cases/delete-comparison.use-case';

@ApiTags('comparisons')
@Controller('comparisons')
export class ComparisonsController {
  constructor(
    private readonly createComparison: CreateComparisonUseCase,
    private readonly findComparison: FindComparisonUseCase,
    private readonly getComparisons: GetComparisonsUseCase,
    private readonly publishComparison: PublishComparisonUseCase,
    private readonly deleteComparison: DeleteComparisonUseCase,
  ) {}

  @Post()
  @UseGuards(OptionalJwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @ApiOperation({ summary: '比較情報を登録' })
  @ApiResponse({ status: 201, type: CreateComparisonResponseDto })
  async create(
    @Body() dto: CreateComparisonDto,
    @CurrentUser() user: JwtPayload | null,
  ): Promise<CreateComparisonResponseDto> {
    return this.createComparison.execute(dto, user);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '比較情報一覧を取得' })
  @ApiResponse({ status: 200, type: [ComparisonResponseDto] })
  async findAll(
    @CurrentUser() user: JwtPayload,
  ): Promise<ComparisonResponseDto[]> {
    return this.getComparisons.execute(user);
  }

  @Get(':id')
  @UseGuards(OptionalJwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '比較情報を取得' })
  @ApiResponse({ status: 200, type: ComparisonResponseDto })
  async findOne(
    @Param('id') id: string,
    @CurrentUser() user: JwtPayload | null,
  ): Promise<ComparisonResponseDto> {
    return this.findComparison.execute(id, user);
  }

  @Put(':id/publish')
  @UseGuards(OptionalJwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: '比較情報を公開状態にする' })
  @ApiResponse({ status: 200 })
  async publish(
    @Param('id') id: string,
    @CurrentUser() user: JwtPayload | null,
  ): Promise<Record<string, never>> {
    await this.publishComparison.execute(id, user);
    return {};
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '比較情報を削除' })
  @ApiResponse({ status: 200 })
  async remove(
    @Param('id') id: string,
    @CurrentUser() user: JwtPayload,
  ): Promise<Record<string, never>> {
    await this.deleteComparison.execute(id, user);
    return {};
  }
}
