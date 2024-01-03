import { Validator } from '@config/helpers';
import { CustomeError } from '@domain/errors';

export class UpdateFavoriteDto {
  private constructor(
    public readonly id: string,
    public readonly contacted: boolean,
    public readonly userId?: string,
    public readonly propertyId?: string,
  ) {}

  get values() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const currentValues: { [key: string]: any } = {};

    if (this.propertyId) currentValues.propertyId = this.propertyId;
    if (this.userId) currentValues.userId = this.userId;
    if (this.contacted) currentValues.contacted = this.contacted;

    return currentValues;
  }

  static create(props: UpdateFavoriteDto): [CustomeError?, UpdateFavoriteDto?] {
    const { id, contacted = false, userId, propertyId } = props;

    let isContacted = contacted;
    if (typeof contacted !== 'boolean') isContacted = contacted === 'true';
    if (!id) return [CustomeError.badRequest('Favorite Id is required')];
    if (!Validator.isMongoId(id)) return [CustomeError.badRequest('Invalid favorite id')];
    if (!userId) return [CustomeError.badRequest('User Id is required')];
    if (!Validator.isMongoId(userId)) return [CustomeError.badRequest('Invalid user id')];
    if (!propertyId) return [CustomeError.badRequest('Property Id is required')];
    if (!Validator.isMongoId(propertyId)) return [CustomeError.badRequest('Invalid property id')];

    return [undefined, new UpdateFavoriteDto(id, isContacted, userId, propertyId)];
  }
}
