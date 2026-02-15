import { Injectable } from '@nestjs/common';
import { JwtPayload } from '../../common/decorators/current-user.decorator';
import { YoutubeTokenRepository } from '../../youtube/repositories/youtube-token.repository';

export interface StatusResponseDto {
  isLogined: boolean;
  isYoutubeAuthroized: boolean;
  user: { id: string; name: string } | null;
}

@Injectable()
export class GetStatusUseCase {
  constructor(private readonly youtubeTokenRepository: YoutubeTokenRepository) {}

  async execute(user: JwtPayload | null): Promise<StatusResponseDto> {
    if (!user) {
      return {
        isLogined: false,
        isYoutubeAuthroized: false,
        user: null,
      };
    }

    const youtubeToken = await this.youtubeTokenRepository.findByUserId(user.sub);

    return {
      isLogined: true,
      isYoutubeAuthroized: !!youtubeToken,
      user: { id: user.sub, name: user.name },
    };
  }
}
