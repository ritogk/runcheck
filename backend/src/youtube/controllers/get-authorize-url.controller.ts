import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthorizeUrlResponseDto } from '../dto/authorize-url-response.dto';
import { GetAuthorizeUrlUseCase } from '../use-cases/get-authorize-url.use-case';

@ApiTags('youtube')
@Controller('youtube')
export class GetAuthorizeUrlController {
  constructor(private readonly getAuthorizeUrl: GetAuthorizeUrlUseCase) {}

  @Get('oauth/authorize')
  @ApiOperation({ summary: '認可画面のURLを取得', operationId: 'getAuthorizeUrl' })
  @ApiResponse({ status: 200, type: AuthorizeUrlResponseDto })
  handle(): AuthorizeUrlResponseDto {
    return this.getAuthorizeUrl.execute();
  }
}
