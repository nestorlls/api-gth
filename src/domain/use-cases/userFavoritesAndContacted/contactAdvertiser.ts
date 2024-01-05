import { FavoriteContactService } from '@domain/abstracts/services';
import { CreateFavoriteContactAdvDto } from '@domain/dtos';
import { FavoriteContactedEntity } from '@domain/entities';

interface IContactAdvertiser {
  execute(dto: CreateFavoriteContactAdvDto): Promise<FavoriteContactedEntity>;
}

export class ContactAdvertiser implements IContactAdvertiser {
  constructor(private readonly service: FavoriteContactService) {}

  execute(dto: CreateFavoriteContactAdvDto): Promise<FavoriteContactedEntity> {
    return this.service.contactAdvertiser(dto);
  }
}
