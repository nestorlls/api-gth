import { Validator } from '@config/helpers';
import { CustomeError } from '@domain/errors';

export class UserEntity {
  public readonly id: string;
  public readonly name: string;
  public readonly email: string;
  public readonly phone: number;
  public readonly role: string[];
  public readonly avatar: string | null;
  public readonly password?: string;

  constructor(props: UserEntity) {
    const { id, name, email, phone, role, password, avatar } = props;
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.role = role;
    this.avatar = avatar;
    this.password = password;
  }

  static fromObject(props: { [key: string]: any }): UserEntity {
    const { id, name, email, phone, role, avatar, password } = props;

    if (!id) throw CustomeError.badRequest('Missing user id');
    if (!Validator.isMongoId(id)) throw CustomeError.badRequest('Invalid user id');
    if (!name) throw CustomeError.badRequest('Missing name');
    if (!email) throw CustomeError.badRequest('Missing email');
    if (!phone) throw CustomeError.badRequest('Missing phone');
    if (!role) throw CustomeError.badRequest('Missing role');
    if (avatar === undefined) throw CustomeError.badRequest('Missing avatar');

    return new UserEntity({ id, name, email, role, avatar, password, phone: Number(phone) });
  }
}
