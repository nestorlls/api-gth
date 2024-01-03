import { Favorite } from '@data/mongo/models';
import { FavoriteDatasource } from '@domain/abstracts/datasource';
import { CreateFavoriteDto, UpdateFavoriteDto } from '@domain/dtos';
import { FavoriteEntity } from '@domain/entities';
import { CustomeError } from '@domain/errors';

export class FavoriteDatasourceImpl implements FavoriteDatasource {
  constructor(private readonly model: typeof Favorite) {}

  async getUserFavorites(userId: string): Promise<FavoriteEntity[]> {
    const favorites = await this.model.find({ user: userId }).populate('property');
    return favorites.map((favorite) => FavoriteEntity.fromObject(favorite.toJSON()));
  }

  async getFavoriteById(id: string): Promise<FavoriteEntity> {
    const favorite = await this.model.findById(id);
    if (!favorite) throw CustomeError.notFound('Favorite not found');
    return FavoriteEntity.fromObject(favorite.toJSON());
  }

  async addFavorite(dto: CreateFavoriteDto): Promise<FavoriteEntity> {
    const { propertyId } = dto;
    await this.getFavoriteById(propertyId);
    const favorite = await this.model.create(dto);
    return FavoriteEntity.fromObject(favorite.toJSON());
  }

  async updateFavorite(dto: UpdateFavoriteDto): Promise<FavoriteEntity> {
    await this.getFavoriteById(dto.id);
    const favorite = await this.model.updateOne({ id: dto.id }, dto, { new: true });
    return FavoriteEntity.fromObject(favorite);
  }

  async removeFavorite(id: string): Promise<FavoriteEntity> {
    await this.getFavoriteById(id);
    const favorite = await this.model.deleteOne({ id });
    return FavoriteEntity.fromObject(favorite);
  }
}
