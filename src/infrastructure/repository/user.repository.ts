import { UserDatasource } from '@domain/abstracts/datasource';
import { UserRepository } from '@domain/abstracts/repository';
import { UpdateUserDto } from '@domain/dtos';
import { PaginationDto, ReturnWithPaginateDto } from '@domain/dtos/shared';
import { UserEntity } from '@domain/entities';

export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly dataSource: UserDatasource) {}

  async getAllUsers(dto: PaginationDto): Promise<ReturnWithPaginateDto<UserEntity>> {
    return await this.dataSource.getAllUsers(dto);
  }

  async getUserById(id: string): Promise<UserEntity> {
    return await this.dataSource.getUserById(id);
  }

  async updateUser(dto: UpdateUserDto): Promise<UserEntity> {
    return await this.dataSource.updateUser(dto);
  }

  async deleteUser(id: string): Promise<UserEntity> {
    return await this.dataSource.deleteUser(id);
  }
}
