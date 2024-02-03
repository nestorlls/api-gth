import { Validator } from '@config/helpers';
import { CustomeError } from '@domain/errors';

export class CreateFavoriteContactAdvDto {
  private constructor(
    public readonly user: string,
    public readonly property: string,
    public readonly favorite?: boolean,
    public readonly contacted?: boolean,
  ) {}

  static create(props: { [key: string]: any }): [CustomeError?, CreateFavoriteContactAdvDto?] {
    const { user, property, favorite = false, contacted = false } = props;

    if (!user) return [CustomeError.badRequest('User Id is required to create favorite')];
    if (!Validator.isMongoId(user)) return [CustomeError.badRequest('Invalid user id to create favorite')];
    if (!property) return [CustomeError.badRequest('Property Id is required to add favorite')];
    if (!Validator.isMongoId(property)) return [CustomeError.badRequest('Invalid property id to add favorite')];

    return [undefined, new CreateFavoriteContactAdvDto(user, property, favorite, contacted)];
  }
}
