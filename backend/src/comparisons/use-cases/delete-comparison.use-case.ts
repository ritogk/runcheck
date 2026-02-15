import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { JwtPayload } from '../../common/decorators/current-user.decorator';
import { ComparisonRepository } from '../repositories/comparison.repository';

@Injectable()
export class DeleteComparisonUseCase {
  constructor(private readonly comparisonRepository: ComparisonRepository) {}

  async execute(comparisonId: string, user: JwtPayload): Promise<void> {
    const record = await this.comparisonRepository.findById(comparisonId);
    if (!record) {
      throw new NotFoundException('比較情報が見つかりません');
    }

    if (record.userId !== user.sub) {
      throw new ForbiddenException('この比較情報を削除する権限がありません');
    }

    await this.comparisonRepository.deleteById(comparisonId, record.userId ?? '');
  }
}
