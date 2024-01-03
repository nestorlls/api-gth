import { UserService } from '@domain/abstracts/services';
import { UpdateUserDto } from '@domain/dtos';
import { UserEntity } from '@domain/entities';

interface IUpdateUser {
  execute(dto: UpdateUserDto): Promise<UserEntity>;
}

export class UpdateUser implements IUpdateUser {
  constructor(private readonly service: UserService) {}

  execute(dto: UpdateUserDto): Promise<UserEntity> {
    return this.service.updateUser(dto);
  }
}
