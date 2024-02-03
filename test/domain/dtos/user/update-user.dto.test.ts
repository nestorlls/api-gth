import { UpdateUserDto } from '../../../../src/domain/dtos';
import { CustomeError } from '../../../../src/domain/errors';

describe('Test Update User Dto', () => {
  const props = {
    id: '507f191e810c19729de860ea',
    name: 'test',
    email: 'test',
    password: 'test',
  };

  test('should create a valid object updateUserDto with valid properties', () => {
    const [error, updateUserDto] = UpdateUserDto.create(props);

    expect(updateUserDto).toBeInstanceOf(UpdateUserDto);
    expect(updateUserDto?.values).toEqual(
      expect.objectContaining({
        name: props.name,
        email: props.email,
        password: props.password,
      }),
    );
    expect(updateUserDto?.values).toHaveProperty('password', props.password);
    expect(error).toBeUndefined();
  });

  test('should throw an error if passing an invalid id', () => {
    const props = {
      id: '1234',
      name: 'test',
      email: 'test',
      password: 'test',
    };

    const [error, updateUserDto] = UpdateUserDto.create(props);

    expect(error).toBeInstanceOf(CustomeError);
    expect(error?.name).toEqual('Bad Request');
    expect(error?.statusCode).toEqual(400);
    expect(error?.message).toEqual('Invalid user id to update');
    expect(updateUserDto).toBeUndefined();
  });

  test('should return an error if does not passing an id', () => {
    const props = {
      name: 'test',
      email: 'test',
      password: 'test',
    };

    const [error, updateUserDto] = UpdateUserDto.create(props);

    expect(error).toBeInstanceOf(CustomeError);
    expect(error?.name).toEqual('Bad Request');
    expect(error?.statusCode).toEqual(400);
    expect(error?.message).toEqual('Missing user id to update');
    expect(updateUserDto).toBeUndefined();
  });
});
