import { AuthService, IUserAuth } from '@domain/abstracts/services';
import { LoginDto } from '@domain/dtos';

interface IUseCaseLogin {
  execute(dto: LoginDto): Promise<IUserAuth>;
}

export class Login implements IUseCaseLogin {
  constructor(private readonly service: AuthService) {}

  execute(dto: LoginDto): Promise<IUserAuth> {
    return this.service.login(dto);
  }
}
