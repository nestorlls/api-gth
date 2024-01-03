import { LoginDto, RegisterDto } from '@domain/dtos';
import { UserEntity } from '@domain/entities';

export interface IUserAuth {
  user: UserEntity;
  token: string;
}

export abstract class AuthService {
  abstract login(dto: LoginDto): Promise<IUserAuth>;
  abstract register(dto: RegisterDto): Promise<IUserAuth>;
}
