import { Validator } from '@config/helpers';
import { CustomeError } from '@domain/errors';

export class UpdateUserDto {
  public readonly id: string;
  public readonly name?: string;
  public readonly email?: string;
  public readonly password?: string;
  public readonly phone?: string;
  public readonly role?: string;
  public readonly avatar?: string;

  private constructor(props: UpdateUserDto) {
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
    this.phone = props.phone;
    this.role = props.role;
    this.avatar = props.avatar;
  }

  get values() {
    const currentValues: { [key: string]: any } = {};

    if (this.name) currentValues.name = this.name;
    if (this.email) currentValues.email = this.email;
    if (this.password) currentValues.password = this.password;
    if (this.phone) currentValues.phone = this.phone;
    if (this.role) currentValues.role = this.role;
    if (this.avatar) currentValues.avatar = this.avatar;

    return currentValues;
  }

  static create(props: { [key: string]: any }): [CustomeError?, UpdateUserDto?] {
    const { id } = props;

    if (!id) return [CustomeError.badRequest('Missing user id to update')];
    if (!Validator.isMongoId(id)) return [CustomeError.badRequest('Invalid user id to update')];

    return [undefined, new UpdateUserDto(props as UpdateUserDto)];
  }
}
