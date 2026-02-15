import { Injectable } from '@nestjs/common';
import { ElectroDBService } from '../../common/electrodb/electrodb.service';
import { ReleaseKbn, type Comparison } from '../../common/entities';

@Injectable()
export class ComparisonRepository {
  constructor(private readonly electrodb: ElectroDBService) {}

  async create(record: Comparison): Promise<void> {
    await this.electrodb.comparison.create(record).go();
  }

  async findById(comparisonId: string): Promise<Comparison | null> {
    const { data } = await this.electrodb.comparison.query
      .byKind({ id: comparisonId })
      .go();
    return (data[0] as Comparison) ?? null;
  }

  async findByUserId(userId: string): Promise<Comparison[]> {
    const { data } = await this.electrodb.comparison.query
      .primary({ userId })
      .go();
    console.log(data)
    return data as Comparison[];
  }

  async deleteById(comparisonId: string, userId: string): Promise<void> {
    await this.electrodb.comparison.delete({ id: comparisonId, userId }).go();
  }

  async publishById(comparisonId: string, userId: string): Promise<void> {
    await this.electrodb.comparison
      .patch({ id: comparisonId, userId })
      .set({ releaseKbn: ReleaseKbn.PUBLIC, updatedAt: new Date().toISOString() })
      .go();
  }
}
