import { FavoriteContactService } from '@domain/abstracts/services';
import { FavoriteContactedEntity } from '@domain/entities';

interface IRemoveFavorite {
  execute(id: string): Promise<FavoriteContactedEntity>;
}
export class RemoveFavorite implements IRemoveFavorite {
  constructor(private readonly service: FavoriteContactService) {}

  execute(id: string): Promise<FavoriteContactedEntity> {
    return this.service.removeFavorite(id);
  }
}
