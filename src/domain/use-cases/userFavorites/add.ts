import { FavoriteService } from '@domain/abstracts/services';
import { CreateFavoriteDto } from '@domain/dtos';
import { FavoriteEntity } from '@domain/entities';

interface IAddFavorite {
  execute(dto: CreateFavoriteDto): Promise<FavoriteEntity>;
}

export class AddFavorite implements IAddFavorite {
  constructor(private readonly service: FavoriteService) {}

  execute(dto: CreateFavoriteDto): Promise<FavoriteEntity> {
    return this.service.addFavorite(dto);
  }
}
