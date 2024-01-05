import { Request, Response } from 'express';

import { FavoriteContactService } from '@domain/abstracts/services';
import { useCases } from '@domain/use-cases/use-cases';
import { HandleError } from '@presentation/errors/handle.error';
import { CreateFavoriteContactAdvDto } from '@domain/dtos';

export class FavoriteController {
  constructor(private readonly service: FavoriteContactService) {}

  getFavoritesContactedProperties = (req: Request, res: Response) => {
    const { user } = req.body;

    new useCases.userfavoritesAndContacts.GetFavoritesAndContactedPropeties(this.service)
      .execute(user.id)
      .then((favorites) => res.status(200).json(favorites))
      .catch((error) => HandleError.handle(error, res));
  };

  addFavorite = (req: Request, res: Response) => {
    const { property } = req.params;
    const { user } = req.body;
    const [error, createFavoriteDto] = CreateFavoriteContactAdvDto.create({ property, user: user.id, favorite: true });
    if (error) return HandleError.handle(error, res);

    new useCases.userfavoritesAndContacts.AddFavorite(this.service)
      .execute(createFavoriteDto!)
      .then((favorite) => res.status(200).json(favorite))
      .catch((error) => HandleError.handle(error, res));
  };

  removeFavorite = (req: Request, res: Response) => {
    const { id } = req.params;
    new useCases.userfavoritesAndContacts.RemoveFavorite(this.service)
      .execute(id)
      .then((favorite) => res.status(204).json(favorite))
      .catch((error) => HandleError.handle(error, res));
  };
}
