import { User } from '@data/mongo/models';
import { UpdateUserDto } from '@domain/dtos';
import { CustomeError } from '@domain/errors';
import { UserEntity } from '@domain/entities';
import { PaginationDto, ReturnWithPaginateDto } from '@domain/dtos/shared';
import { UserDatasource } from '@domain/abstracts/datasource';

export class UserDataSourceImpl implements UserDatasource {
  constructor(private readonly model: typeof User) {}

  async getAllUsers(args: PaginationDto): Promise<ReturnWithPaginateDto<UserEntity>> {
    const { page, limit } = args;
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

  async getUserById(args: string): Promise<UserEntity> {
    const id = args;
    const userFound = await this.model.findById(id);
    if (!userFound) throw CustomeError.notFound('User not found');
    return UserEntity.fromObject(userFound.toJSON());
  }

  async updateUser(args: UpdateUserDto): Promise<UserEntity> {
    const { id } = args;
    await this.getUserById(id);
    const userUpdated = await this.model.updateOne({ id }, args, { new: true });
    return UserEntity.fromObject(userUpdated);
  }

  async deleteUser(args: string): Promise<UserEntity> {
    const id = args;
    await this.getUserById(id);
    const userDeleted = await this.model.deleteOne({ id });
    return UserEntity.fromObject(userDeleted);
  }
}
