import { FavoriteContactService } from '@domain/abstracts/services';
import { CreateFavoriteContactAdvDto } from '@domain/dtos';
import { FavoriteContactedEntity } from '@domain/entities';

interface IAddFavorite {
  execute(dto: CreateFavoriteContactAdvDto): Promise<FavoriteContactedEntity>;
}

export class AddFavorite implements IAddFavorite {
  constructor(private readonly service: FavoriteContactService) {}

  execute(dto: CreateFavoriteContactAdvDto): Promise<FavoriteContactedEntity> {
    return this.service.addFavorite(dto);
  }
}
