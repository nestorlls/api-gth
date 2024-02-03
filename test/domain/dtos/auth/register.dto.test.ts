import { IRegisterOptions, RegisterDto } from '../../../../src/domain/dtos';

describe('Test Register Dto', () => {
  test('should create a valid object registerDto with valid properties', () => {
    const props: IRegisterOptions = {
      name: 'John Doe',
      email: 'j@j.com',
      password: 'Password1',
      phone: '123',
      role: 'homeseeker',
    };

    const [error, registerDto] = RegisterDto.create(props);

    expect(error).toBeUndefined();
    expect(registerDto).toMatchObject(props);
    expect(registerDto).toBeInstanceOf(RegisterDto);
    expect(registerDto).toHaveProperty('name');
  });

  test('should throw an error with invalid properties', () => {
    const props: IRegisterOptions = {
      name: 'John Doe',
      email: 'johndoe&example.com',
      password: 'P1',
      phone: '1234567890',
      role: 'homeseeker',
    };

    try {
      const [error, registerDto] = RegisterDto.create(props);
      expect(error).toBeUndefined();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error).toHaveProperty('message');
    }
  });
});
