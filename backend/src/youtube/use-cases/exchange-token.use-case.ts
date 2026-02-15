import { Injectable, BadRequestException } from '@nestjs/common';
import { google } from 'googleapis';
import { JwtPayload } from '../../common/decorators/current-user.decorator';
import { YoutubeTokenRepository } from '../repositories/youtube-token.repository';
import { ExchangeTokenResponseDto } from '../dto/exchange-token-response.dto';

@Injectable()
export class ExchangeTokenUseCase {
  constructor(private readonly youtubeTokenRepository: YoutubeTokenRepository) {}

  async execute(
    code: string,
    user: JwtPayload | null,
  ): Promise<ExchangeTokenResponseDto> {
    const oauth2Client = new google.auth.OAuth2(
      process.env.YOUTUBE_CLIENT_ID,
      process.env.YOUTUBE_CLIENT_SECRET,
      process.env.YOUTUBE_REDIRECT_URL,
    );

    try {
      const { tokens } = await oauth2Client.getToken(code);

      if (user && tokens.refresh_token) {
        const now = new Date().toISOString();
        await this.youtubeTokenRepository.save({
          userId: user.sub,
          refreshToken: tokens.refresh_token,
          createdAt: now,
          updatedAt: now,
        });
      }

      return { accessToken: tokens.access_token || '' };
    } catch {
      throw new BadRequestException('YouTube認可コードの交換に失敗しました');
    }
  }
}
