import { LoginDto } from '../../../../src/domain/dtos';

describe('Test login Dto', () => {
  test('should create a valid object loginDto with valid properties', () => {
    const props = {
      email: 'j@j.com',
      password: 'Password1',
    };

    const [error, loginDto] = LoginDto.create(props);

    expect(error).toBeUndefined();
    expect(loginDto).toMatchObject(props);
    expect(loginDto).toBeInstanceOf(LoginDto);
    expect(loginDto).toHaveProperty('email');
    expect(loginDto).toHaveProperty('password');
  });

  test('should throw an error with invalid properties', () => {
    const props = {
      email: 'johndoe&example.com',
      password: 'P1',
    };

    try {
      const [error, loginDto] = LoginDto.create(props);
      expect(error).toBeUndefined();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error).toHaveProperty('message');
    }
  });
});
