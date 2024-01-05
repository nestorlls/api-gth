import { Request, Response } from 'express';

import { FavoriteContactService } from '@domain/abstracts/services';
import { CreateFavoriteContactAdvDto } from '@domain/dtos';
import { HandleError } from '@presentation/errors/handle.error';
import { useCases } from '@domain/use-cases/use-cases';

export class ContactAdvetiserController {
  constructor(private readonly service: FavoriteContactService) {}

  contactAdvertiser = (req: Request, res: Response) => {
    const { property } = req.params;
    const { user } = req.body;

    const [error, createContactDto] = CreateFavoriteContactAdvDto.create({
      property,
      user: user.id,
      contacted: true,
    });

    if (error) return HandleError.handle(error, res);

    new useCases.userfavoritesAndContacts.ContactAdvertiser(this.service)
      .execute(createContactDto!)
      .then((contact) => res.status(200).json(contact))
      .catch((error) => HandleError.handle(error, res));
  };

  unContactAdvertiser = (req: Request, res: Response) => {
    const { id } = req.params;
    new useCases.userfavoritesAndContacts.UnContactAdvertiser(this.service)
      .execute(id)
      .then((contact) => res.status(204).json(contact))
      .catch((error) => HandleError.handle(error, res));
  };
}
