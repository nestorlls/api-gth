import { User } from '@data/mongo/models';
import { AuthDatasource } from '@domain/abstracts/datasource';
import { LoginDto, RegisterDto } from '@domain/dtos';
import { UserEntity } from '@domain/entities';
import { CustomeError } from '@domain/errors';

export class AuthDatasourceImpl implements AuthDatasource {
  constructor(private readonly model: typeof User) {}

  async login(dto: LoginDto): Promise<UserEntity> {
    const { email } = dto;
    const userExists = await this.model.findOne({ email });
    if (!userExists) throw CustomeError.notFound('User not found');
    return UserEntity.fromObject(userExists.toJSON());
  }

  async register(dto: RegisterDto): Promise<UserEntity> {
    const { email } = dto;
    const userExists = await this.model.findOne({ email });
    if (userExists) throw CustomeError.badRequest('User already exists');
    const user = await this.model.create(dto);
    return UserEntity.fromObject(user.toJSON());
  }
}
