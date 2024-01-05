import { FavoriteAndContacted } from '@data/mongo/models';
import { FavoriteContactDatasource } from '@domain/abstracts/datasource';
import { CreateFavoriteContactAdvDto } from '@domain/dtos';
import { FavoriteContactedEntity } from '@domain/entities';
import { CustomeError } from '@domain/errors';

export class FavoriteContactDatasourceImpl implements FavoriteContactDatasource {
  constructor(private readonly model: typeof FavoriteAndContacted) {}

  async getFavoritesAndContactedProperties(user: string): Promise<FavoriteContactedEntity[]> {
    let favorites;
    try {
      favorites = await this.model.find({ user }).populate('property');
    } catch (error) {
      throw CustomeError.internalServerError(`${error}`);
    }

    return favorites.map((favorite) => FavoriteContactedEntity.fromObject(favorite.toJSON()));
  }

  async addFavorite(dto: CreateFavoriteContactAdvDto): Promise<FavoriteContactedEntity> {
    const { property, user } = dto;

    let favoriteProperty;
    try {
      const isExists = await this.existsProperty(property, user);
      if (isExists) {
        favoriteProperty = await this.model.findByIdAndUpdate(
          { _id: isExists.id },
          { favorite: dto.favorite },
          { new: true },
        );
      } else {
        favoriteProperty = await this.model.create(dto);
      }
    } catch (error) {
      throw CustomeError.internalServerError(`${error}`);
    }
    return FavoriteContactedEntity.fromObject(favoriteProperty!.toJSON());
  }

  async removeFavorite(id: string): Promise<FavoriteContactedEntity> {
    let favorite;
    try {
      const favoriteExists = await this.model.findById(id);
      if (favoriteExists?.contacted) {
        favorite = await this.model.findByIdAndUpdate({ _id: id }, { favorite: false }, { new: true });
      } else {
        favorite = await this.model.findByIdAndDelete({ _id: id });
      }
    } catch (error) {
      throw CustomeError.internalServerError(`${error}`);
    }
    if (!favorite) throw CustomeError.badRequest('Favorite not found');
    return FavoriteContactedEntity.fromObject(favorite);
  }

  async contactAdvertiser(dto: CreateFavoriteContactAdvDto): Promise<FavoriteContactedEntity> {
    const { property, user } = dto;

    let propertyContacted;
    try {
      const isExists = await this.existsProperty(property, user);
      if (isExists) {
        propertyContacted = await this.model.findByIdAndUpdate(
          { _id: isExists.id },
          { contacted: dto.contacted },
          { new: true },
        );
      } else {
        propertyContacted = await this.model.create(dto);
      }
    } catch (error) {
      throw CustomeError.internalServerError(`${error}`);
    }
    return FavoriteContactedEntity.fromObject(propertyContacted!.toJSON());
  }

  async unContactedAdvertiser(id: string): Promise<FavoriteContactedEntity> {
    let propertyContacted;
    try {
      const contactedExists = await this.model.findById(id);
      if (contactedExists?.favorite) {
        propertyContacted = await this.model.findByIdAndUpdate({ _id: id }, { contacted: false }, { new: true });
      } else {
        propertyContacted = await this.model.findByIdAndDelete({ _id: id });
      }
    } catch (error) {
      throw CustomeError.internalServerError(`${error}`);
    }
    if (!propertyContacted) throw CustomeError.badRequest('Favorite not found');
    return FavoriteContactedEntity.fromObject(propertyContacted);
  }

  private async existsProperty(property: string, user: string): Promise<any | null> {
    return await this.model.findOne({ property, user });
  }
}
