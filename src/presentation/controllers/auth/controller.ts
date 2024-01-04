import { Request, Response } from 'express';

import { useCases } from '@domain/use-cases/use-cases';
import { LoginDto, RegisterDto } from '@domain/dtos';
import { AuthService } from '@domain/abstracts/services';
import { HandleError } from '@presentation/errors/handle.error';

export class AuthController {
  constructor(private readonly service: AuthService) {}

  login = (req: Request, res: Response) => {
    const [error, loginDto] = LoginDto.create(req.body);
    if (error) return HandleError.handle(error, res);

    new useCases.auth.Login(this.service)
      .execute(loginDto!)
      .then((user) => res.status(200).json(user))
      .catch((error) => HandleError.handle(error, res));
  };

  register = (req: Request, res: Response) => {
    const [error, registerDto] = RegisterDto.create(req.body);
    if (error) return HandleError.handle(error, res);

    new useCases.auth.Register(this.service)
      .execute(registerDto!)
      .then((user) => res.status(200).json(user))
      .catch((error) => HandleError.handle(error, res));
  };
}
