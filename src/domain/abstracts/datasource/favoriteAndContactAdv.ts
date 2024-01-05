import { CreateFavoriteContactAdvDto } from '@domain/dtos';
import { FavoriteContactedEntity } from '@domain/entities';

export abstract class FavoriteContactDatasource {
  abstract getFavoritesAndContactedProperties(user: string): Promise<FavoriteContactedEntity[]>;
  abstract addFavorite(dto: CreateFavoriteContactAdvDto): Promise<FavoriteContactedEntity>;
  abstract removeFavorite(id: string): Promise<FavoriteContactedEntity>;
  abstract contactAdvertiser(dto: CreateFavoriteContactAdvDto): Promise<FavoriteContactedEntity>;
  abstract unContactedAdvertiser(id: string): Promise<FavoriteContactedEntity>;
}
