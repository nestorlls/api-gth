import { FavoriteService } from '@domain/abstracts/services';
import { UpdateFavoriteDto } from '@domain/dtos';
import { FavoriteEntity } from '@domain/entities';

interface IUpdateFavorite {
  execute(dto: UpdateFavoriteDto): Promise<FavoriteEntity>;
}

export class UpdateFavorite implements IUpdateFavorite {
  constructor(private readonly service: FavoriteService) {}

  execute(dto: UpdateFavoriteDto): Promise<FavoriteEntity> {
    return this.service.updateFavorite(dto);
  }
}
