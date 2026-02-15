import { Injectable } from '@nestjs/common';
import { DynamoDBService } from '../../common/dynamodb/dynamodb.service';

const TABLE_NAME = process.env.DYNAMODB_TABLE_NAME || 'RunCheck';

@Injectable()
export class OperationLogRepository {
  constructor(private readonly dynamodb: DynamoDBService) {}

  async incrementCount(operationCd: number): Promise<void> {
    await this.dynamodb.update({
      TableName: TABLE_NAME,
      Key: { userId: '', kind: `OPERATION_LOG@${operationCd}` },
      UpdateExpression:
        'SET executionCnt = if_not_exists(executionCnt, :zero) + :inc, updatedAt = :now',
      ExpressionAttributeValues: {
        ':inc': 1,
        ':zero': 0,
        ':now': new Date().toISOString(),
      },
    });
  }
}
