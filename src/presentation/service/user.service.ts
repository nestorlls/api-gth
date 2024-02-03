import { UserRepository } from '@domain/abstracts/repository';
import { UserService } from '@domain/abstracts/services';
import { PaginationDto, ReturnWithPaginateDto, UpdateUserDto } from '@domain/dtos';
import { UserEntity } from '@domain/entities';

export class UserServices implements UserService {
  constructor(private readonly repository: UserRepository) {}

  async getAllUsers(dto: PaginationDto): Promise<ReturnWithPaginateDto<UserEntity>> {
    return await this.repository.getAllUsers(dto);
  }

  async getUserById(id: string): Promise<UserEntity> {
    return await this.repository.getUserById(id);
  }

  async updateUser(dto: UpdateUserDto): Promise<UserEntity> {
    return await this.repository.updateUser(dto);
  }

  async deleteUser(id: string): Promise<UserEntity> {
    return await this.repository.deleteUser(id);
  }
}
