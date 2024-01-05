import { FavoriteService } from '@domain/abstracts/services';
import { FavoriteEntity } from '@domain/entities';

interface IGetAllUserFavorites {
  execute(userId: string): Promise<FavoriteEntity[]>;
}
export class GetAllFavorites implements IGetAllUserFavorites {
  constructor(private readonly service: FavoriteService) {}

  execute(userId: string): Promise<FavoriteEntity[]> {
    return this.service.getUserFavorites(userId);
  }
}
