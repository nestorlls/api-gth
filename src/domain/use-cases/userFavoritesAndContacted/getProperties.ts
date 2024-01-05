import { FavoriteContactService } from '@domain/abstracts/services';
import { FavoriteContactedEntity } from '@domain/entities';

interface IGetAllPropeties {
  execute(user: string): Promise<FavoriteContactedEntity[]>;
}
export class GetFavoritesAndContactedPropeties implements IGetAllPropeties {
  constructor(private readonly service: FavoriteContactService) {}

  execute(user: string): Promise<FavoriteContactedEntity[]> {
    return this.service.getFavoritesAndContactedProperties(user);
  }
}
