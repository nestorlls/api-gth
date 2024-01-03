import { FavoriteService } from '@domain/abstracts/services';
import { FavoriteEntity } from '@domain/entities';

interface IRemoveFavorite {
  execute(id: string): Promise<FavoriteEntity>;
}
export class RemoveFavorite implements IRemoveFavorite {
  constructor(private readonly service: FavoriteService) {}

  execute(id: string): Promise<FavoriteEntity> {
    return this.service.removeFavorite(id);
  }
}
