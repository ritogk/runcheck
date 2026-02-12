import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { JwtPayload } from '../../common/decorators/current-user.decorator';
import { ComparisonRepository } from '../repositories/comparison.repository';

@Injectable()
export class PublishComparisonUseCase {
  constructor(private readonly comparisonRepository: ComparisonRepository) {}

  async execute(comparisonId: string, user: JwtPayload | null): Promise<void> {
    const record = await this.comparisonRepository.findById(comparisonId);
    if (!record) {
      throw new NotFoundException('比較情報が見つかりません');
    }

    const isOwner = user && record.userId === user.sub;
    const isAnonymous = record.anonymous;

    if (!isOwner && !isAnonymous) {
      throw new ForbiddenException('この比較情報を公開する権限がありません');
    }

    await this.comparisonRepository.publishById(comparisonId);
  }
}
