import { User } from '@data/mongo/models';
import { AuthDatasource } from '@domain/abstracts/datasource';
import { LoginDto, RegisterDto } from '@domain/dtos';
import { UserEntity } from '@domain/entities';
import { CustomeError } from '@domain/errors';

export class AuthDatasourceImpl implements AuthDatasource {
  constructor(private readonly model: typeof User) {}

  async login(dto: LoginDto): Promise<UserEntity> {
    let user;
    try {
      user = await this.model.findOne({ email: dto.email });
    } catch (error) {
      throw CustomeError.internalServerError(`${error}`);
    }
    if (!user) throw CustomeError.notFound('User not found');
    return UserEntity.fromObject(user);
  }

  async register(dto: RegisterDto): Promise<UserEntity> {
    let user;
    try {
      user = await this.model.findOne({ email: dto.email });
    } catch (error) {
      throw CustomeError.internalServerError(`${error}`);
    }

    if (user) throw CustomeError.badRequest('User already exists');

    try {
      user = await this.model.create(dto);
    } catch (error) {
      throw CustomeError.internalServerError(`${error}`);
    }

    return UserEntity.fromObject(user.toJSON());
  }
}
