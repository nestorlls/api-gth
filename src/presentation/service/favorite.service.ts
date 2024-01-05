import { Validator } from '@config/helpers';
import { FavoriteRepository } from '@domain/abstracts/repository';
import { FavoriteService } from '@domain/abstracts/services';
import { CreateFavoriteDto } from '@domain/dtos';
import { FavoriteEntity } from '@domain/entities';
import { CustomeError } from '@domain/errors';

export class FavoriteServices implements FavoriteService {
  constructor(private readonly repository: FavoriteRepository) {}

  async getUserFavorites(user: string): Promise<FavoriteEntity[]> {
    this.isValidaId(user);
    return await this.repository.getUserFavorites(user);
  }

  async addFavorite(dto: CreateFavoriteDto): Promise<FavoriteEntity> {
    return await this.repository.addFavorite(dto);
  }

  async removeFavorite(id: string): Promise<FavoriteEntity> {
    this.isValidaId(id);
    return await this.repository.removeFavorite(id);
  }

  private isValidaId(id: string) {
    if (!Validator.isMongoId(id)) throw CustomeError.badRequest(`'${id}' is not a valid Mongo Id`);
  }
}
