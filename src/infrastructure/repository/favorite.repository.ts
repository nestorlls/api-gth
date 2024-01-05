import { FavoriteDatasource } from '@domain/abstracts/datasource';
import { FavoriteRepository } from '@domain/abstracts/repository';
import { CreateFavoriteDto } from '@domain/dtos';
import { FavoriteEntity } from '@domain/entities';

export class FavoriteRepositoryImpl implements FavoriteRepository {
  constructor(private readonly datasource: FavoriteDatasource) {}

  async getUserFavorites(userId: string): Promise<FavoriteEntity[]> {
    return await this.datasource.getUserFavorites(userId);
  }

  async addFavorite(dto: CreateFavoriteDto): Promise<FavoriteEntity> {
    return await this.datasource.addFavorite(dto);
  }

  async removeFavorite(id: string): Promise<FavoriteEntity> {
    return await this.datasource.removeFavorite(id);
  }
}
