import { UserService } from '@domain/abstracts/services';
import { PaginationDto, ReturnWithPaginateDto } from '@domain/dtos/shared';
import { UserEntity } from '@domain/entities';

interface IGetAllUsers {
  execute(dto: PaginationDto): Promise<ReturnWithPaginateDto<UserEntity>>;
}

export class GetallUsers implements IGetAllUsers {
  constructor(private readonly service: UserService) {}

  execute(dto: PaginationDto): Promise<ReturnWithPaginateDto<UserEntity>> {
    return this.service.getAllUsers(dto);
  }
}
