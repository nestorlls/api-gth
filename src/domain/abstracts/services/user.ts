import { PaginationDto, ReturnWithPaginateDto, UpdateUserDto } from '@domain/dtos';
import { UserEntity } from '@domain/entities';

export abstract class UserService {
  abstract getAllUsers(dto: PaginationDto): Promise<ReturnWithPaginateDto<UserEntity>>;
  abstract getUserById(id: string): Promise<UserEntity>;
  abstract updateUser(dto: UpdateUserDto): Promise<UserEntity>;
  abstract deleteUser(id: string): Promise<UserEntity>;
}
