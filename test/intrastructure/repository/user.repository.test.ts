import { UserDatasource } from '../../../src/domain/abstracts/datasource';
import { UpdatePropertyDto } from '../../../src/domain/dtos';
import { UserRepositoryImpl } from '../../../src/infrastructure/repository';

describe('Test User Repository', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockUserDatasource: UserDatasource = {
    getAllUsers: jest.fn(),
    getUserById: jest.fn(),
    updateUser: jest.fn(),
    deleteUser: jest.fn(),
  };
  const userRepositoryImpl = new UserRepositoryImpl(mockUserDatasource);
  const paginationDto = { page: 1, limit: 10 };
  const userId = '123';

  test('should get all users', async () => {
    const spyGetAll = jest.spyOn(mockUserDatasource, 'getAllUsers');

    await userRepositoryImpl.getAllUsers(paginationDto!);

    expect(spyGetAll).toHaveBeenCalled();
    expect(spyGetAll).toHaveBeenCalledWith(paginationDto);
    expect(mockUserDatasource.getAllUsers).toHaveBeenCalledWith(paginationDto);
    expect(mockUserDatasource.getAllUsers).toHaveBeenCalledTimes(1);
  });

  test('should get a user by id', async () => {
    const spyGetById = jest.spyOn(mockUserDatasource, 'getUserById');

    await userRepositoryImpl.getUserById(userId);

    expect(spyGetById).toHaveBeenCalled();
    expect(spyGetById).toHaveBeenCalledWith(userId);
    expect(spyGetById).toHaveBeenCalledTimes(1);
    expect(mockUserDatasource.getUserById).toHaveBeenCalledWith(userId);
  });

  test('should update a user', async () => {
    const updateDto = UpdatePropertyDto.create({ id: '00000020f51bb4362eee2a4d', name: 'Paul' })[1];
    const spyUpdateUser = jest.spyOn(mockUserDatasource, 'updateUser');

    await userRepositoryImpl.updateUser(updateDto!);

    expect(spyUpdateUser).toHaveBeenCalled();
    expect(spyUpdateUser).toHaveBeenCalledWith(updateDto);
    expect(spyUpdateUser).toHaveBeenCalledTimes(1);
    expect(mockUserDatasource.updateUser).toHaveBeenCalledWith(updateDto);
  });

  test('should delete a user', async () => {
    const spyDeleteUser = jest.spyOn(mockUserDatasource, 'deleteUser');

    await userRepositoryImpl.deleteUser(userId);

    expect(spyDeleteUser).toHaveBeenCalled();
    expect(spyDeleteUser).toHaveBeenCalledWith(userId);
    expect(spyDeleteUser).toHaveBeenCalledTimes(1);
    expect(mockUserDatasource.deleteUser).toHaveBeenCalledWith(userId);
  });
});
