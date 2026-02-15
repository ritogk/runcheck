import { Injectable } from '@nestjs/common';
import {
  ComparisonEntity,
  ReleaseKbn,
  type ComparisonAttributes,
} from '../../common/electrodb/entities/comparison.entity';

@Injectable()
export class ComparisonRepository {
  async create(record: ComparisonAttributes): Promise<void> {
    await ComparisonEntity.create(record).go();
  }

  async findById(comparisonId: string): Promise<ComparisonAttributes | null> {
    const { data } = await ComparisonEntity.query
      .byKind({ id: comparisonId })
      .go();
    return data[0] ?? null;
  }

  async findByUserId(userId: string): Promise<ComparisonAttributes[]> {
    const { data } = await ComparisonEntity.query
      .primary({ userId })
      .go();
    return data;
  }

  async deleteById(comparisonId: string, userId: string): Promise<void> {
    await ComparisonEntity.delete({ id: comparisonId, userId }).go();
  }

  async publishById(comparisonId: string, userId: string): Promise<void> {
    await ComparisonEntity
      .patch({ id: comparisonId, userId })
      .set({ releaseKbn: ReleaseKbn.PUBLIC, updatedAt: new Date().toISOString() })
      .go();
  }
}
