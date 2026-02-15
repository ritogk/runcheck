import { Module } from '@nestjs/common';
import { ComparisonsController } from './comparisons.controller';
import { CreateComparisonUseCase } from './use-cases/create-comparison.use-case';
import { FindComparisonUseCase } from './use-cases/find-comparison.use-case';
import { GetComparisonsUseCase } from './use-cases/get-comparisons.use-case';
import { PublishComparisonUseCase } from './use-cases/publish-comparison.use-case';
import { DeleteComparisonUseCase } from './use-cases/delete-comparison.use-case';
import { ComparisonRepository } from './repositories/comparison.repository';

@Module({
  controllers: [ComparisonsController],
  providers: [
    CreateComparisonUseCase,
    FindComparisonUseCase,
    GetComparisonsUseCase,
    PublishComparisonUseCase,
    DeleteComparisonUseCase,
    ComparisonRepository,
  ],
})
export class ComparisonsModule {}
