import { LoginDto, RegisterDto } from '@domain/dtos';
import { UserEntity } from '@domain/entities';

export abstract class AuthDatasource {
  abstract login(args: LoginDto): Promise<UserEntity>;
  abstract register(args: RegisterDto): Promise<UserEntity>;
}
