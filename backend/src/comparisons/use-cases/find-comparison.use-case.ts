import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { JwtPayload } from '../../common/decorators/current-user.decorator';
import { ReleaseKbn } from '../../common/entities';
import { ComparisonRepository } from '../repositories/comparison.repository';
import { ComparisonResponseDto } from '../dto/create-comparison.dto';

@Injectable()
export class FindComparisonUseCase {
  constructor(private readonly comparisonRepository: ComparisonRepository) {}

  async execute(
    comparisonId: string,
    user: JwtPayload | null,
  ): Promise<ComparisonResponseDto> {
    const record = await this.comparisonRepository.findById(comparisonId);
    if (!record) {
      throw new NotFoundException('比較情報が見つかりません');
    }

    const isPublished = record.releaseKbn === ReleaseKbn.PUBLIC;
    const isOwner = user && record.userId === user.sub;

    if (!isPublished && !isOwner) {
      throw new ForbiddenException('この比較情報にアクセスする権限がありません');
    }

    return {
      id: record.id,
      category: record.category,
      memo: record.memo,
      title: record.title,
      video1Url: record.video1Url,
      video1TimeSt: record.video1TimeSt,
      video1VideoType: record.video1VideoType,
      video2Url: record.video2Url,
      video2TimeSt: record.video2TimeSt,
      video2VideoType: record.video2VideoType,
      anonymous: record.anonymous,
    };
  }
}
