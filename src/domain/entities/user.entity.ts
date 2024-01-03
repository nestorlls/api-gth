import { Validator } from '@config/helpers';
import { CustomeError } from '@domain/errors';

export class UserEntity {
  public readonly id: string;
  public readonly name: string;
  public readonly email: string;
  public readonly phone: string;
  public readonly role: string[];
  public readonly avatar: string | null;
  public readonly password?: string;

  private constructor(props: UserEntity) {
    const { id, name, email, phone, role, password, avatar } = props;
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.role = role;
    this.avatar = avatar;
    this.password = password;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromObject(props: { [key: string]: any }): UserEntity {
    const { id, name, email, phone, role, password, avatar } = props;

    if (!id) throw CustomeError.badRequest('Missing id');
    if (!Validator.isMongoId(id)) throw CustomeError.badRequest('Invalid user id');
    if (!name) throw CustomeError.badRequest('Missing name');
    if (!email) throw CustomeError.badRequest('Missing email');
    if (!phone) throw CustomeError.badRequest('Missing phone');
    if (!role) throw CustomeError.badRequest('Missing role');
    if (!password) throw CustomeError.badRequest('Missing password');
    if (!avatar) throw CustomeError.badRequest('Missing avatar');

    return new UserEntity(props as UserEntity);
  }
}
