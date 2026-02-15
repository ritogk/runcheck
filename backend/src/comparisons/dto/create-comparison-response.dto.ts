import { ApiProperty } from '@nestjs/swagger';

export class CreateComparisonResponseDto {
  @ApiProperty({ description: '比較ID' })
  comparisonId: string;
}
