import { UserService } from '@domain/abstracts/services';
import { UpdateUserDto } from '@domain/dtos';
import { PaginationDto } from '@domain/dtos/shared';
import { useCases } from '@domain/use-cases/use-cases';
import { HandleError } from '@presentation/errors/handle.error';
import { Request, Response } from 'express';

export class UserController {
  constructor(private readonly service: UserService) {}

  getAllUsers = (req: Request, res: Response) => {
    const { page = 1, limit = 10 } = req.params;
    const [error, paginationDto] = PaginationDto.create({ page: +page, limit: +limit });
    if (error) return HandleError.handle(error, res);

    new useCases.users.GetallUsers(this.service)
      .execute(paginationDto!)
      .then((user) => res.status(200).json(user))
      .catch((error) => HandleError.handle(error, res));
  };

  getUserById = (req: Request, res: Response) => {
    const { id } = req.params;
    new useCases.users.GetUserById(this.service)
      .execute(id)
      .then((user) => res.status(200).json(user))
      .catch((error) => HandleError.handle(error, res));
  };

  updateUser = (req: Request, res: Response) => {
    const { id } = req.params;
    const [error, updateDto] = UpdateUserDto.create({ id, ...req.body });
    if (error) return HandleError.handle(error, res);

    new useCases.users.UpdateUser(this.service)
      .execute(updateDto!)
      .then((user) => res.status(200).json(user))
      .catch((error) => HandleError.handle(error, res));
  };

  deleteUser = (req: Request, res: Response) => {
    const { id } = req.params;
    new useCases.users.DeleteUser(this.service)
      .execute(id)
      .then((user) => res.status(204).json(user))
      .catch((error) => HandleError.handle(error, res));
  };
}
