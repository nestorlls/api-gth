import { Validator } from '@config/helpers';
import { CustomeError } from '@domain/errors';

export class LoginDto {
  private constructor(
    public readonly email: string,
    public readonly password: string,
  ) {}

  static create(props: LoginDto): [CustomeError?, LoginDto?] {
    const { email, password } = props;

    if (!email) return [CustomeError.badRequest('Email is required')];
    if (!Validator.isEmail(email)) return [CustomeError.badRequest('Invalid email format')];
    if (!password) return [CustomeError.badRequest('Password is required')];
    if (!Validator.isPassword(password)) return [CustomeError.badRequest('Invalid password format')];

    return [undefined, new LoginDto(props.email, props.password)];
  }
}
