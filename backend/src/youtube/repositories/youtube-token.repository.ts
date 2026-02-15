import { Injectable } from '@nestjs/common';
import { ElectroDBService } from '../../common/electrodb/electrodb.service';
import type { YoutubeToken } from '../../common/entities';

@Injectable()
export class YoutubeTokenRepository {
  constructor(private readonly electrodb: ElectroDBService) {}

  async save(record: YoutubeToken): Promise<void> {
    await this.electrodb.youtubeToken.put(record).go();
  }

  async findByUserId(userId: string): Promise<YoutubeToken | null> {
    const { data } = await this.electrodb.youtubeToken
      .get({ userId })
      .go();
    return (data as YoutubeToken) ?? null;
  }
}
