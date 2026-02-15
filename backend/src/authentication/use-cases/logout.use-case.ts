import { Injectable } from '@nestjs/common';

@Injectable()
export class LogoutUseCase {
  execute(): void {
    // JWT is stateless - logout is handled client-side by discarding the token
  }
}
