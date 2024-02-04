import { Validator } from '@config/helpers';
import { CustomeError } from '@domain/errors';

export interface IRegisterOptions {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: string;
}

export class RegisterDto {
  public readonly name: string;
  public readonly email: string;
  public readonly password: string;
  public readonly phone: string;
  public readonly role: string;

  private constructor(props: IRegisterOptions) {
    const { name, email, password, phone, role } = props;
    this.name = name;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.role = role;
  }

  static create(props: { [key: string]: any }): [CustomeError?, RegisterDto?] {
    const { name, email, password, phone, role } = props;

    const validRoles = ['homeseeker', 'landlord'];

    if (!name) return [CustomeError.badRequest('Name is required')];
    if (!email) return [CustomeError.badRequest('Email is required')];
    if (!Validator.isEmail(email)) return [CustomeError.badRequest('Invalid email format')];
    if (!password) return [CustomeError.badRequest('Password is required')];
    if (!Validator.isPassword(password)) return [CustomeError.badRequest('Invalid password format')];
    if (!phone) return [CustomeError.badRequest('Phone is required')];
    if (!role) return [CustomeError.badRequest('Role is required')];
    if (!validRoles.includes(role))
      return [CustomeError.badRequest(`${role} is not a valid role. Valid roles: ${validRoles}`)];

    return [undefined, new RegisterDto({ name, email, password, phone, role })];
  }
}
