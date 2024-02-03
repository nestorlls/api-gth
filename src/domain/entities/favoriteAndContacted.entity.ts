import { CustomeError } from '@domain/errors';

export class FavoriteContactedEntity {
  public readonly id: string;
  public readonly property: string;
  public readonly user: string;
  public readonly favorite: boolean;
  public readonly contacted: boolean;

  constructor(props: FavoriteContactedEntity) {
    const { id, property, user, favorite, contacted } = props;
    this.id = id;
    this.user = user;
    this.property = property;
    this.favorite = favorite;
    this.contacted = contacted;
  }

  static fromObject(props: { [key: string]: any }): FavoriteContactedEntity {
    const { id, property, user, favorite, contacted } = props;

    if (!property) throw CustomeError.badRequest('Missing property');
    if (!user) throw CustomeError.badRequest('Missing user');

    return new FavoriteContactedEntity({ id, property, user, favorite, contacted });
  }
}
