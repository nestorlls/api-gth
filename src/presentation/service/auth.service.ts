import { BcryptAdapter, JwtAdapter } from '@config/adapters';
import { AuthRepository } from '@domain/abstracts/repository';
import { AuthService, IUserAuth } from '@domain/abstracts/services/auth';
import { LoginDto, RegisterDto } from '@domain/dtos';
import { CustomeError } from '@domain/errors';

export class AuthServices implements AuthService {
  constructor(private readonly repository: AuthRepository) {}

  async login(dto: LoginDto): Promise<IUserAuth> {
    const { password, ...user } = await this.repository.login(dto);
    let isMatch, token;
    try {
      isMatch = BcryptAdapter.compare(dto.password, password!);
      token = await this.generateToken({ id: user.id, email: user.email });
    } catch (error) {
      throw CustomeError.internalServerError(`${error}`);
    }

    if (!isMatch) throw CustomeError.badRequest('Invalid credentials');
    if (!token) throw CustomeError.internalServerError('Error generating token');

    return { user, token };
  }

  async register(dto: RegisterDto): Promise<IUserAuth> {
    const passwordHashed = BcryptAdapter.hash(dto.password);
    const user = await this.repository.register({ ...dto, password: passwordHashed });

    let token;
    try {
      token = await this.generateToken({ id: user.id, email: user.email });
    } catch (error) {
      throw CustomeError.internalServerError(`${error}`);
    }

    if (!token) throw CustomeError.internalServerError('Error generating token');

    return { user, token };
  }

  private async generateToken(user: any) {
    return await JwtAdapter.generateToken(user);
  }
}
