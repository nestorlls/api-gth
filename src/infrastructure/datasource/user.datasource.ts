import { User } from '@data/mongo/models';
import { PaginationDto, ReturnWithPaginateDto, UpdateUserDto } from '@domain/dtos';
import { CustomeError } from '@domain/errors';
import { UserEntity } from '@domain/entities';
import { UserDatasource } from '@domain/abstracts/datasource';

export class UserDataSourceImpl implements UserDatasource {
  constructor(private readonly model: typeof User) {}

  async getAllUsers(dto: PaginationDto): Promise<ReturnWithPaginateDto<UserEntity>> {
    const { page, limit } = dto;
    const [total, users] = await Promise.all([
      this.model.countDocuments(),
      this.model
        .find()
        .skip((page - 1) * limit)
        .limit(limit),
    ]);

    return ReturnWithPaginateDto.create({
      page,
      limit,
      total,
      next: page * limit < total ? `${'hola'}/users?page=${page + 1}&limit=${limit}` : null,
      prev: page - 1 > 0 && limit - 1 < total ? `${'hola'}/users?page=${page - 1}&limit=${limit}` : null,
      data: users.map((user) => UserEntity.fromObject(user.toJSON())),
    });
  }

  async getUserById(id: string): Promise<UserEntity> {
    let user;
    try {
      user = await this.model.findById(id);
    } catch (error) {
      throw CustomeError.internalServerError(`${error}`);
    }
    if (!user) throw CustomeError.notFound('User not found');
    return UserEntity.fromObject(user.toJSON());
  }

  async updateUser(dto: UpdateUserDto): Promise<UserEntity> {
    let user;
    try {
      user = await this.model.findByIdAndUpdate({ _id: dto.id }, dto, { new: true });
    } catch (error) {
      throw CustomeError.internalServerError(`${error}`);
    }
    if (!user) throw CustomeError.notFound('User not found');

    return UserEntity.fromObject(user!.toJSON());
  }

  async deleteUser(id: string): Promise<UserEntity> {
    let user;
    try {
      user = await this.model.findByIdAndDelete({ _id: id });
    } catch (error) {
      throw CustomeError.internalServerError(`${error}`);
    }
    return UserEntity.fromObject(user!);
  }
}
