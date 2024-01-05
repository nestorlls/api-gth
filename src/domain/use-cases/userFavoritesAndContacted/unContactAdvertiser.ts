import { FavoriteContactService } from '@domain/abstracts/services';
import { FavoriteContactedEntity } from '@domain/entities';

interface IUnContactAdvertiser {
  execute(id: string): Promise<FavoriteContactedEntity>;
}

export class UnContactAdvertiser implements IUnContactAdvertiser {
  constructor(private readonly service: FavoriteContactService) {}

  execute(id: string): Promise<FavoriteContactedEntity> {
    return this.service.unContactedAdvertiser(id);
  }
}
