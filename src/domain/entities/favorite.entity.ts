import { CustomeError } from '@domain/errors';

export class FavoriteEntity {
  public readonly id: string;
  public readonly property: string;
  public readonly user: string;

  private constructor(props: FavoriteEntity) {
    const { id, property, user } = props;
    this.id = id;
    this.user = user;
    this.property = property;
  }

  static fromObject(props: { [key: string]: any }): FavoriteEntity {
    const { id, property, user } = props;

    if (!property) throw CustomeError.badRequest('Missing property');
    if (!user) throw CustomeError.badRequest('Missing user');

    return new FavoriteEntity({ id, property, user });
  }
}
