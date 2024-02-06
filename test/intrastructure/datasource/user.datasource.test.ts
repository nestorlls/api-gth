import mongoose from 'mongoose';
import { envs } from '../../../src/config/environments';
import { MongoDB } from '../../../src/data/mongo/connection/mongo.connection';
import { UserDataSourceImpl } from '../../../src/infrastructure/datasource';
import { User } from '../../../src/data/mongo/models';
import { UpdateUserDto } from '../../../src/domain/dtos';

describe('Test User Datasource', () => {
  beforeAll(async () => {
    const mongo = new MongoDB();
    await mongo.connection({
      mongoUrl: envs.MONGO_DB_URL,
      dbName: envs.MONGO_DB_NAME,
    });
  });

  beforeEach(async () => {
    await User.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  // instance of UserDatasource
  const mockUserDatasourceImpl = new UserDataSourceImpl(User);
  const paginationDto = { page: 1, limit: 8 };
  test('should return all users', async () => {
    const spyGetAllUser = jest.spyOn(mockUserDatasourceImpl, 'getAllUsers');

    await mockUserDatasourceImpl.getAllUsers(paginationDto!);

    expect(spyGetAllUser).toHaveBeenCalled();
    expect(spyGetAllUser).toHaveBeenCalledWith(paginationDto);
    expect(spyGetAllUser).toHaveBeenCalledTimes(1);
    expect(mockUserDatasourceImpl.getAllUsers).toHaveBeenCalledWith(paginationDto);
  });

  test('should get a user by id', async () => {
    const user = await User.create({
      name: 'test name',
      email: 'test email',
      password: 'test password hashed',
      phone: '999999999',
      avatar: 'url avatar',
    });
    const spyGetUserById = jest.spyOn(mockUserDatasourceImpl, 'getUserById');

    await mockUserDatasourceImpl.getUserById(user.id);

    expect(spyGetUserById).toHaveBeenCalled();
    expect(spyGetUserById).toHaveBeenCalledWith(user.id);
    expect(spyGetUserById).toHaveBeenCalledTimes(1);
    expect(mockUserDatasourceImpl.getUserById).toHaveBeenCalledWith(user.id);
  });

  test('should update a user', async () => {
    const user = await User.create({
      name: 'test name',
      email: 'test email',
      password: 'test password hashed',
      phone: '999999999',
      avatar: 'url avatar',
    });
    const [_, updateDto] = UpdateUserDto.create({ id: user.id, name: 'Paul Llanque' });
    const spyUpdate = jest.spyOn(mockUserDatasourceImpl, 'updateUser');

    await mockUserDatasourceImpl.updateUser(updateDto!);

    expect(spyUpdate).toHaveBeenCalled();
    expect(spyUpdate).toHaveBeenCalledWith(updateDto);
    expect(spyUpdate).toHaveBeenCalledTimes(1);
    expect(mockUserDatasourceImpl.updateUser).toHaveBeenCalledWith(updateDto);
  });

  test('should delete a user', async () => {
    const user = await User.create({
      name: 'test name',
      email: 'test email',
      password: 'test password hashed',
      phone: '999999999',
      avatar: 'url avatar',
    });
    const spyDelete = jest.spyOn(mockUserDatasourceImpl, 'deleteUser');

    await mockUserDatasourceImpl.deleteUser(user.id);

    expect(spyDelete).toHaveBeenCalled();
    expect(spyDelete).toHaveBeenCalledWith(user.id);
    expect(spyDelete).toHaveBeenCalledTimes(1);
    expect(mockUserDatasourceImpl.deleteUser).toHaveBeenCalledWith(user.id);
  });
});
