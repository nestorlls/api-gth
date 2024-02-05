import { AuthDatasource } from '../../../src/domain/abstracts/datasource';
import { AuthRespositoryImpl } from '../../../src/infrastructure/repository';
import { RegisterDto } from '../../../src/domain/dtos';

describe('Test Authentication Repository', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockAuthDatasource: AuthDatasource = {
    login: jest.fn(),
    register: jest.fn(),
  };

  const registerDto = RegisterDto.create({ email: 'j@j.com', password: '123' })[1];
  const authRepositoryImpl = new AuthRespositoryImpl(mockAuthDatasource);

  test('should create or register a new user', async () => {
    const registerSpy = jest.spyOn(mockAuthDatasource, 'register');

    await authRepositoryImpl.register(registerDto!);

    expect(registerSpy).toHaveBeenCalled();
    expect(registerSpy).toHaveBeenCalledWith(registerDto);
    expect(mockAuthDatasource.register).toHaveBeenCalledWith(registerDto);
  });

  test('should login a user', async () => {
    const user = {
      email: 'j@j.com',
      password: '123',
    };

    const loginSpy = jest.spyOn(mockAuthDatasource, 'login');

    await authRepositoryImpl.login(user);

    expect(loginSpy).toHaveBeenCalled();
    expect(loginSpy).toHaveBeenCalledWith(user);
    expect(mockAuthDatasource.login).toHaveBeenCalledWith(user);
  });
});
