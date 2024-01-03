import { Validator } from '@config/helpers';
import { CustomeError } from '@domain/errors';

export class FavoriteEntity {
  public readonly property: string;
  public readonly user: string;
  public readonly contacted: boolean;

  private constructor(props: FavoriteEntity) {
    const { property, user, contacted } = props;
    this.user = user;
    this.property = property;
    this.contacted = contacted;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromObject(props: { [key: string]: any }): FavoriteEntity {
    const { property, user, contacted } = props;

    if (!property) throw CustomeError.badRequest('Missing property');
    if (Validator.isMongoId(property)) throw CustomeError.badRequest('Invalid property id');
    if (!user) throw CustomeError.badRequest('Missing user');
    if (!Validator.isMongoId(user)) throw CustomeError.badRequest('Invalid user id');
    if (!contacted) throw CustomeError.badRequest('Missing contacted');
    if (contacted !== true && contacted !== false) throw CustomeError.badRequest('Invalid contacted');

    return new FavoriteEntity(props as FavoriteEntity);
  }
}
