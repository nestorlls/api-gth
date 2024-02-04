import { UserEntity } from '../../../src/domain/entities';
import { CustomeError } from '../../../src/domain/errors';

describe('Test User Entity', () => {
  test('should create a new UserEntity with all required properties', () => {
    const props = {
      id: '507f191e810c19729de860ea',
      name: 'test',
      email: 'test@test.com',
      phone: 999999999,
      role: ['homeseeker'],
      password: 'Password1',
      avatar: '',
    };

    const user = new UserEntity(props);

    expect(user).toBeInstanceOf(UserEntity);
    expect(user).toHaveProperty('id', props.id);
    expect(user).toHaveProperty('name', props.name);
    expect(user).toHaveProperty('email', props.email);
  });

  test('should map an object to a UserEntity', () => {
    const props = {
      id: '507f191e810c19729de860ea',
      name: 'test',
      email: 'test@test.com',
      phone: 999999999,
      role: ['homeseeker'],
      password: 'Password1',
      avatar: '',
    };

    const user = UserEntity.fromObject(props);

    expect(user).toBeInstanceOf(UserEntity);
    expect(user).toHaveProperty('id', props.id);
    expect(user).toHaveProperty('name', props.name);
  });

  test('should throw a bad request if passing an invalid id', () => {
    const props = {
      id: '1234',
      name: 'test',
      email: 'test@test.com',
      phone: 999999999,
      role: ['homeseeker'],
      password: 'Password1',
      avatar: '',
    };

    expect(() => UserEntity.fromObject(props)).toThrow(CustomeError.badRequest('Invalid user id'));
  });

  test('should throw a bad request if passing an invalid name', () => {
    const props = {
      id: '507f191e810c19729de860ea',
      email: 'test@test.com',
      phone: 999999999,
      role: ['homeseeker'],
      password: 'Password1',
      avatar: '',
    };

    expect(() => UserEntity.fromObject(props)).toThrow(CustomeError.badRequest('Missing name'));
  });
});
