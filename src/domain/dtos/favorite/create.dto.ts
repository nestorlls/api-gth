import { Validator } from '@config/helpers';
import { CustomeError } from '@domain/errors';

export class CreateFavoriteDto {
  private constructor(
    public readonly userId: string,
    public readonly propertyId: string,
    public readonly contacted?: boolean,
  ) {}

  static create(props: CreateFavoriteDto): [CustomeError?, CreateFavoriteDto?] {
    const { userId, propertyId, contacted = false } = props;

    let isContacted = contacted;

    if (typeof contacted !== 'boolean') isContacted = contacted === 'true';
    if (!userId) return [CustomeError.badRequest('User Id is required')];
    if (!Validator.isMongoId(userId)) return [CustomeError.badRequest('Invalid user id')];
    if (!propertyId) return [CustomeError.badRequest('Property Id is required')];
    if (!Validator.isMongoId(propertyId)) return [CustomeError.badRequest('Invalid property id')];
    if (!contacted && typeof contacted !== 'boolean') return [CustomeError.badRequest('Contacted is required')];

    return [undefined, new CreateFavoriteDto(userId, propertyId, isContacted)];
  }
}
