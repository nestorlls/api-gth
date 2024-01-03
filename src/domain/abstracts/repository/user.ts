import { UpdateUserDto } from '@domain/dtos';
import { UserEntity } from '@domain/entities';
import { PaginationDto, ReturnWithPaginateDto } from '@domain/dtos/shared';

export abstract class UserRepository {
  abstract getAllUsers(dto: PaginationDto): Promise<ReturnWithPaginateDto<UserEntity>>;
  abstract getUserById(id: string): Promise<UserEntity>;
  abstract updateUser(dto: UpdateUserDto): Promise<UserEntity>;
  abstract deleteUser(id: string): Promise<UserEntity>;
}
