import { Injectable } from '@nestjs/common';
import { JwtPayload } from '../../common/decorators/current-user.decorator';
import { UserResponseDto } from '../../users/dto/create-user.dto';

@Injectable()
export class GetMeUseCase {
  execute(user: JwtPayload): UserResponseDto {
    return { id: user.sub, name: user.name };
  }
}
