import { Login } from '../../../../src/domain/use-cases/auth';
import { LoginDto } from '../../../../src/domain/dtos/auth';

describe('Test Register User Case', () => {
  const mockAuthService = {
    login: jest.fn().mockReturnValue({ user: {}, token: 'token' }),
    register: jest.fn().mockReturnValue({ user: {}, token: 'token' }),
  };

  test('should call Login Use case', async () => {
    const login = new Login(mockAuthService);
    const loginDto = LoginDto.create({ email: 'j@j.com', password: '123' })[1];

    const result = await login.execute(loginDto!);

    expect(result).toEqual({ token: 'token', user: {} });
    expect(mockAuthService.login).toHaveBeenCalledWith(loginDto);
  });
});
