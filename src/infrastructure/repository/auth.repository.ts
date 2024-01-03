import { AuthDatasource } from '@domain/abstracts/datasource';
import { AuthRepository } from '@domain/abstracts/repository';
import { LoginDto, RegisterDto } from '@domain/dtos';
import { UserEntity } from '@domain/entities';

export class AuthRespositoryImpl implements AuthRepository {
  constructor(private readonly dataSource: AuthDatasource) {}

  async login(dto: LoginDto): Promise<UserEntity> {
    return await this.dataSource.login(dto);
  }

  async register(dto: RegisterDto): Promise<UserEntity> {
    return await this.dataSource.register(dto);
  }
}
