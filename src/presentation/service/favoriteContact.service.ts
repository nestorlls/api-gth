import { Validator } from '@config/helpers';
import { FavoriteContactRepository } from '@domain/abstracts/repository';
import { FavoriteContactService } from '@domain/abstracts/services';
import { CreateFavoriteContactAdvDto } from '@domain/dtos';
import { FavoriteContactedEntity } from '@domain/entities';
import { CustomeError } from '@domain/errors';

export class FavoriteContactServices implements FavoriteContactService {
  constructor(private readonly repository: FavoriteContactRepository) {}

  async getFavoritesAndContactedProperties(user: string): Promise<FavoriteContactedEntity[]> {
    this.isValidaId(user);
    return await this.repository.getFavoritesAndContactedProperties(user);
  }

  async addFavorite(dto: CreateFavoriteContactAdvDto): Promise<FavoriteContactedEntity> {
    return await this.repository.addFavorite(dto);
  }

  async removeFavorite(id: string): Promise<FavoriteContactedEntity> {
    this.isValidaId(id);
    return await this.repository.removeFavorite(id);
  }

  async contactAdvertiser(dto: CreateFavoriteContactAdvDto): Promise<FavoriteContactedEntity> {
    return await this.repository.contactAdvertiser(dto);
  }

  async unContactedAdvertiser(id: string): Promise<FavoriteContactedEntity> {
    this.isValidaId(id);
    return await this.repository.unContactedAdvertiser(id);
  }

  private isValidaId(id: string) {
    if (!Validator.isMongoId(id)) throw CustomeError.badRequest(`'${id}' is not a valid Mongo Id`);
  }
}
