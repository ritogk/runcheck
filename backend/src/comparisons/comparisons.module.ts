import { Module } from '@nestjs/common';
import { CreateComparisonController } from './controllers/create-comparison.controller';
import { GetComparisonsController } from './controllers/get-comparisons.controller';
import { FindComparisonController } from './controllers/find-comparison.controller';
import { PublishComparisonController } from './controllers/publish-comparison.controller';
import { DeleteComparisonController } from './controllers/delete-comparison.controller';
import { CreateComparisonUseCase } from './use-cases/create-comparison.use-case';
import { FindComparisonUseCase } from './use-cases/find-comparison.use-case';
import { GetComparisonsUseCase } from './use-cases/get-comparisons.use-case';
import { PublishComparisonUseCase } from './use-cases/publish-comparison.use-case';
import { DeleteComparisonUseCase } from './use-cases/delete-comparison.use-case';
import { ComparisonRepository } from './repositories/comparison.repository';

@Module({
  controllers: [
    CreateComparisonController,
    GetComparisonsController,
    FindComparisonController,
    PublishComparisonController,
    DeleteComparisonController,
  ],
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
