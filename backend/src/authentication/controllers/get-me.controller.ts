import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser, JwtPayload } from '../../common/decorators/current-user.decorator';
import { UserResponseDto } from '../../users/dto/user-response.dto';
import { GetMeUseCase } from '../use-cases/get-me.use-case';

@ApiTags('authentication')
@Controller('authentication')
export class GetMeController {
  constructor(private readonly getMeUseCase: GetMeUseCase) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'ログイン済のユーザー情報を取得' })
  @ApiResponse({ status: 200, type: UserResponseDto })
  handle(@CurrentUser() user: JwtPayload): UserResponseDto {
    return this.getMeUseCase.execute(user);
  }
}
