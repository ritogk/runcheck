import { Injectable } from '@nestjs/common';
import { JwtPayload } from '../../common/decorators/current-user.decorator';
import { ComparisonRepository } from '../repositories/comparison.repository';
import { ComparisonResponseDto } from '../dto/create-comparison.dto';

@Injectable()
export class GetComparisonsUseCase {
  constructor(private readonly comparisonRepository: ComparisonRepository) {}

  async execute(user: JwtPayload): Promise<ComparisonResponseDto[]> {
    const records = await this.comparisonRepository.findByUserId(user.sub);

    return records.map((record) => ({
      id: record.comparisonId,
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
    }));
  }
}
