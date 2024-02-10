import { AuthServices } from '../../../src/presentation/service';

describe('Test Auth Service', () => {
  const mockAuthRepository = {
    login: jest.fn().mockReturnValue({ user: {}, token: 'token' }),
    register: jest.fn().mockReturnValue({ user: {}, token: 'token' }),
  };

  const mockAuthService = new AuthServices(mockAuthRepository);

  test('should login a user', async () => {
    const loginDto = { email: 'j@j.com', password: '123' };
    const spyLogin = jest.spyOn(mockAuthService, 'login');

    await mockAuthService.login(loginDto);

    expect(spyLogin).toHaveBeenCalledWith(loginDto);
  });
});
