import mongoose from 'mongoose';
import { User } from '../../../src/data/mongo/models';
import { envs } from '../../../src/config/environments';
import { MongoDB } from '../../../src/data/mongo/connection/mongo.connection';
import { AuthDatasourceImpl } from '../../../src/infrastructure/datasource';
import { RegisterDto } from '../../../src/domain/dtos';
import { CustomeError } from '../../../src/domain/errors';

describe('Test Authentication Datasource', () => {
  beforeAll(async () => {
    const mongo = new MongoDB();
    await mongo.connection({ mongoUrl: envs.MONGO_DB_URL, dbName: envs.MONGO_DB_NAME });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  // instance of AuthDatasource
  const mockAuthDatasource = new AuthDatasourceImpl(User);
  const [_, registerDto] = RegisterDto.create({
    name: 'Paul',
    email: 'j@j.com',
    password: 'Passowrd1',
    phone: '123',
    role: 'homeseeker',
  });

  test('should register a new user', async () => {
    const createSpy = jest.spyOn(mockAuthDatasource, 'register');

    await mockAuthDatasource.register(registerDto!);

    expect(createSpy).toHaveBeenCalled();
    expect(createSpy).toHaveBeenCalledWith(registerDto);
    expect(mockAuthDatasource.register).toHaveBeenCalledTimes(1);
    expect(mockAuthDatasource.register).toHaveBeenCalledWith(registerDto);
  });

  test('should throw an error if user already exists', async () => {
    const user = {
      name: 'Paul',
      email: 'j@j.com',
      password: 'Passowrd1',
      phone: '123',
      role: 'homeseeker',
    };

    try {
      await mockAuthDatasource.register(user);
      expect(true).toBe(false);
    } catch (error) {
      expect(error).toBeInstanceOf(CustomeError);
      expect(`${error}`).toEqual('Bad Request: User already exists');
    }
  });

  test('should login a user', async () => {
    const loginSpy = jest.spyOn(mockAuthDatasource, 'login');
    const user = {
      email: 'j@j.com',
      password: 'Passowrd1',
    };

    await mockAuthDatasource.login(user);

    expect(loginSpy).toHaveBeenCalled();
    expect(loginSpy).toHaveBeenCalledWith(user);
    expect(mockAuthDatasource.login).toHaveBeenCalledTimes(1);

    await User.deleteMany({});
  });

  test('should throw an error if user not found', async () => {
    const user = {
      email: 'j@j.com',
      password: 'Passowrd1',
    };

    try {
      await mockAuthDatasource.login(user);
      expect(true).toBe(false);
    } catch (error) {
      expect(error).toBeInstanceOf(CustomeError);
      expect(`${error}`).toEqual('Not Found: User not found');
    }
  });
});
