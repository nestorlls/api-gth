import { UserService } from '@domain/abstracts/services';
import { UserEntity } from '@domain/entities';

interface IGetUserById {
  execute(id: string): Promise<UserEntity>;
}
export class GetUserById implements IGetUserById {
  constructor(private readonly service: UserService) {}

  execute(id: string): Promise<UserEntity> {
    return this.service.getUserById(id);
  }
}
