import { LoginDto, RegisterDto } from '@domain/dtos';
import { UserEntity } from '@domain/entities';

export abstract class AuthRepository {
  abstract login(dto: LoginDto): Promise<UserEntity>;
  abstract register(dto: RegisterDto): Promise<UserEntity>;
}
