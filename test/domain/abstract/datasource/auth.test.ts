import { AuthDatasource } from '../../../../src/domain/abstracts/datasource/auth';
import { UserEntity } from '../../../../src/domain/entities/user.entity';
import { LoginDto, RegisterDto } from '../../../../src/domain/dtos/auth';

describe('Test Property datasource abstract class', () => {
  const user = new UserEntity({
    id: '123',
    name: 'john',
    email: 'j@j.com',
    phone: '123',
    role: ['homeseeker'],
    avatar: '',
    password: '123',
  });

  const userRegisterDto = {
    name: 'john',
    email: 'j@j.com',
    password: '123',
    phone: '123',
    role: 'homeseeker',
  };

  class AuthMock extends AuthDatasource {
    async login(args: LoginDto): Promise<UserEntity> {
      return user;
    }

    async register(args: RegisterDto): Promise<UserEntity> {
      return user;
    }
  }

  const mockAuthDatasource = new AuthMock();

  test('should instance of AuthDatasource', () => {
    expect(mockAuthDatasource).toBeInstanceOf(AuthDatasource);
    expect(mockAuthDatasource).toHaveProperty('register');
    expect(mockAuthDatasource).toHaveProperty('login');
  });

  test('should create a new property', async () => {
    const newUser = await mockAuthDatasource.register(userRegisterDto);

    expect(newUser).toEqual(user);
  });

  test('should login a user', async () => {
    const userLoged = await mockAuthDatasource.login({ email: 'j@j.com', password: '123' });

    expect(userLoged).toEqual(user);
  });
});
