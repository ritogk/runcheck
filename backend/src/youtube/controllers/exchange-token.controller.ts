import { Controller, Post, Body, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { OptionalJwtAuthGuard } from '../../common/guards/optional-jwt-auth.guard';
import { CurrentUser, JwtPayload } from '../../common/decorators/current-user.decorator';
import { YoutubeOauthDto } from '../dto/youtube-oauth.dto';
import { ExchangeTokenResponseDto } from '../dto/exchange-token-response.dto';
import { ExchangeTokenUseCase } from '../use-cases/exchange-token.use-case';

@ApiTags('youtube')
@Controller('youtube')
export class ExchangeTokenController {
  constructor(private readonly exchangeToken: ExchangeTokenUseCase) {}

  @Post('oauth')
  @UseGuards(OptionalJwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'アクセストークンを取得' })
  @ApiResponse({ status: 200, type: ExchangeTokenResponseDto })
  async handle(
    @Body() dto: YoutubeOauthDto,
    @CurrentUser() user: JwtPayload | null,
  ): Promise<ExchangeTokenResponseDto> {
    return this.exchangeToken.execute(dto.code, user);
  }
}
