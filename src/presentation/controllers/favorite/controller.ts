import { Request, Response } from 'express';

import { FavoriteService } from '@domain/abstracts/services';
import { useCases } from '@domain/use-cases/use-cases';
import { HandleError } from '@presentation/errors/handle.error';
import { CreateFavoriteDto } from '@domain/dtos';

export class FavoriteController {
  constructor(private readonly service: FavoriteService) {}

  getUserFavorites = (req: Request, res: Response) => {
    const { user } = req.body;

    new useCases.userfavorites.GetAllFavorites(this.service)
      .execute(user.id)
      .then((favorites) => res.status(200).json(favorites))
      .catch((error) => HandleError.handle(error, res));
  };

  addFavorite = (req: Request, res: Response) => {
    const { property } = req.params;
    const { user } = req.body;
    const [error, createDto] = CreateFavoriteDto.create({ property, user: user.id });
    if (error) return HandleError.handle(error, res);

    new useCases.userfavorites.AddFavorite(this.service)
      .execute(createDto!)
      .then((favorite) => res.status(200).json(favorite))
      .catch((error) => HandleError.handle(error, res));
  };

  removeFavorite = (req: Request, res: Response) => {
    const { id } = req.params;
    new useCases.userfavorites.RemoveFavorite(this.service)
      .execute(id)
      .then((favorite) => res.status(204).json(favorite))
      .catch((error) => HandleError.handle(error, res));
  };
}
