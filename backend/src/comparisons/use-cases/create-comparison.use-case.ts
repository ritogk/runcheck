import { Injectable } from '@nestjs/common';
import { ulid } from 'ulid';
import { JwtPayload } from '../../common/decorators/current-user.decorator';
import { ReleaseKbn } from '../../common/electrodb/entities/comparison.entity';
import { ComparisonRepository } from '../repositories/comparison.repository';
import { CreateComparisonDto } from '../dto/create-comparison.dto';
import { CreateComparisonResponseDto } from '../dto/create-comparison-response.dto';

@Injectable()
export class CreateComparisonUseCase {
  constructor(private readonly comparisonRepository: ComparisonRepository) {}

  async execute(
    dto: CreateComparisonDto,
    user: JwtPayload | null,
  ): Promise<CreateComparisonResponseDto> {
    const now = new Date().toISOString();
    const comparisonId = ulid();

    await this.comparisonRepository.create({
      id: comparisonId,
      userId: user ? user.sub : '',
      title: dto.title,
      memo: dto.memo,
      category: dto.category,
      video1Url: dto.video1Url,
      video1TimeSt: dto.video1TimeSt,
      video1VideoType: dto.video1VideoType,
      video2Url: dto.video2Url,
      video2TimeSt: dto.video2TimeSt,
      video2VideoType: dto.video2VideoType,
      releaseKbn: ReleaseKbn.PRIVATE,
      anonymous: dto.anonymous,
      createdAt: now,
      updatedAt: now,
    });

    return { comparisonId };
  }
}
