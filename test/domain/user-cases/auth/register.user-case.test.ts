import { Register } from '../../../../src/domain/use-cases/auth';
import { RegisterDto } from '../../../../src/domain/dtos/auth';

describe('Test Register User Case', () => {
  const mockAuthService = {
    login: jest.fn().mockReturnValue({ user: {}, token: 'token' }),
    register: jest.fn().mockReturnValue({ user: {}, token: 'token' }),
  };

  test('should call Register Use case', async () => {
    const register = new Register(mockAuthService);
    const registerDto = RegisterDto.create({ email: 'j@j.com', password: '123' })[1];

    const result = await register.execute(registerDto!);

    expect(result).toEqual({ token: 'token', user: {} });
    expect(mockAuthService.register).toHaveBeenCalledWith(registerDto);
  });
});
