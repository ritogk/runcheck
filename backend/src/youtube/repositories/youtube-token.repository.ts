import { Injectable } from '@nestjs/common';
import {
  YoutubeTokenEntity,
  type YoutubeTokenAttributes,
} from '../../common/electrodb/entities/youtube-token.entity';

@Injectable()
export class YoutubeTokenRepository {
  async save(record: YoutubeTokenAttributes): Promise<void> {
    await YoutubeTokenEntity.put(record).go();
  }

  async findByUserId(userId: string): Promise<YoutubeTokenAttributes | null> {
    const { data } = await YoutubeTokenEntity.get({ userId }).go();
    return data ?? null;
  }
}
