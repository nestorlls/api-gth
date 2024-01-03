import { UserService } from '@domain/abstracts/services';
import { UserEntity } from '@domain/entities';

interface IDeleteUser {
  execute(id: string): Promise<UserEntity>;
}

export class DeleteUser implements IDeleteUser {
  constructor(private readonly service: UserService) {}

  execute(id: string): Promise<UserEntity> {
    return this.service.deleteUser(id);
  }
}
