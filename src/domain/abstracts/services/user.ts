import { UpdateUserDto } from '@domain/dtos';
import { UserEntity } from '@domain/entities';
import { PaginationDto, ReturnWithPaginateDto } from '@domain/dtos/shared';

export abstract class UserService {
  abstract getAllUsers(args: PaginationDto): Promise<ReturnWithPaginateDto<UserEntity>>;
  abstract getUserById(args: string): Promise<UserEntity>;
  abstract updateUser(args: UpdateUserDto): Promise<UserEntity>;
  abstract deleteUser(args: string): Promise<UserEntity>;
}
