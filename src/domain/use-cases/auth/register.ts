import { AuthService, IUserAuth } from '@domain/abstracts/services';
import { RegisterDto } from '@domain/dtos';

interface IUseCaseRegister {
  execute(dto: RegisterDto): Promise<IUserAuth>;
}

export class Register implements IUseCaseRegister {
  constructor(private readonly service: AuthService) {}

  execute(dto: RegisterDto): Promise<IUserAuth> {
    return this.service.register(dto);
  }
}
