import { FavoriteContactDatasource } from '@domain/abstracts/datasource';
import { FavoriteContactRepository } from '@domain/abstracts/repository';
import { CreateFavoriteContactAdvDto } from '@domain/dtos';
import { FavoriteContactedEntity } from '@domain/entities';

export class FavoriteContactRepositoryImpl implements FavoriteContactRepository {
  constructor(private readonly datasource: FavoriteContactDatasource) {}

  async getFavoritesAndContactedProperties(userId: string): Promise<FavoriteContactedEntity[]> {
    return await this.datasource.getFavoritesAndContactedProperties(userId);
  }

  async addFavorite(dto: CreateFavoriteContactAdvDto): Promise<FavoriteContactedEntity> {
    return await this.datasource.addFavorite(dto);
  }

  async removeFavorite(id: string): Promise<FavoriteContactedEntity> {
    return await this.datasource.removeFavorite(id);
  }

  async contactAdvertiser(dto: CreateFavoriteContactAdvDto): Promise<FavoriteContactedEntity> {
    return await this.datasource.contactAdvertiser(dto);
  }

  async unContactedAdvertiser(id: string): Promise<FavoriteContactedEntity> {
    return await this.datasource.unContactedAdvertiser(id);
  }
}
