import { Favorite } from '@data/mongo/models';
import { FavoriteDatasource } from '@domain/abstracts/datasource';
import { CreateFavoriteDto } from '@domain/dtos';
import { FavoriteEntity } from '@domain/entities';
import { CustomeError } from '@domain/errors';

export class FavoriteDatasourceImpl implements FavoriteDatasource {
  constructor(private readonly model: typeof Favorite) {}

  async getUserFavorites(user: string): Promise<FavoriteEntity[]> {
    let favorites;
    try {
      favorites = await this.model.find({ user }).populate('property');
    } catch (error) {
      throw CustomeError.internalServerError(`${error}`);
    }

    return favorites.map((favorite) => FavoriteEntity.fromObject(favorite.toJSON()));
  }

  async addFavorite(dto: CreateFavoriteDto): Promise<FavoriteEntity> {
    const { property, user } = dto;
    await this.getFavorite(property, user);

    let newFavorite;
    try {
      newFavorite = await this.model.create(dto);
    } catch (error) {
      throw CustomeError.internalServerError(`${error}`);
    }
    return FavoriteEntity.fromObject(newFavorite.toJSON());
  }

  async removeFavorite(id: string): Promise<FavoriteEntity> {
    let favorite;
    try {
      favorite = await this.model.findByIdAndDelete({ _id: id });
    } catch (error) {
      throw CustomeError.internalServerError(`${error}`);
    }
    if (!favorite) throw CustomeError.badRequest('Favorite not found');
    return FavoriteEntity.fromObject(favorite);
  }

  private async getFavorite(property: string, user: string): Promise<void | null> {
    let propertyFound;
    try {
      propertyFound = await this.model.findOne({ property, user });
    } catch (error) {
      throw CustomeError.internalServerError(`${error}`);
    }
    if (propertyFound) throw CustomeError.badRequest('Property already exists in favorites');
  }
}
