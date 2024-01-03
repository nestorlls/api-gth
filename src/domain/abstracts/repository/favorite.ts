import { CreateFavoriteDto, UpdateFavoriteDto } from '@domain/dtos';
import { FavoriteEntity } from '@domain/entities';

export abstract class FavoriteRepository {
  abstract getUserFavorites(userId: string): Promise<FavoriteEntity[]>;
  abstract addFavorite(dto: CreateFavoriteDto): Promise<FavoriteEntity>;
  abstract updateFavorite(dto: UpdateFavoriteDto): Promise<FavoriteEntity>;
  abstract removeFavorite(id: string): Promise<FavoriteEntity>;
}
