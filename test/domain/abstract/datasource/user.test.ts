import { UserDatasource } from '../../../../src/domain/abstracts/datasource/user';
import { UserEntity } from '../../../../src/domain/entities/user.entity';
import { UpdateUserDto, PaginationDto, ReturnWithPaginateDto } from '../../../../src/domain/dtos';

describe('Test Auth datasource abstract class', () => {
  const paginationDto = {
    page: 1,
    limit: 10,
  };

  const user = new UserEntity({
    id: '123',
    name: 'john',
    email: 'j@j.com',
    phone: '123',
    role: ['homeseeker'],
    avatar: '',
    password: '123',
  });

  const returnWithPaginateDto = {
    page: 1,
    limit: 10,
    total: 1,
    next: null,
    prev: null,
    data: [user],
  };

  class UserMock extends UserDatasource {
    async getAllUsers(dto: PaginationDto): Promise<ReturnWithPaginateDto<UserEntity>> {
      return returnWithPaginateDto;
    }

    async getUserById(id: string): Promise<UserEntity> {
      return user;
    }

    async updateUser(dto: UpdateUserDto): Promise<UserEntity> {
      return user;
    }

    async deleteUser(id: string): Promise<UserEntity> {
      return user;
    }
  }

  const userDatasource = new UserMock();

  test('should instance of UserDatasource', () => {
    expect(userDatasource).toBeInstanceOf(UserDatasource);
    expect(userDatasource).toHaveProperty('getAllUsers');
    expect(userDatasource).toHaveProperty('getUserById');
    expect(userDatasource).toHaveProperty('updateUser');
    expect(userDatasource).toHaveProperty('deleteUser');
  });

  test('should return all users', async () => {
    const spyGetAll = jest.spyOn(userDatasource, 'getAllUsers');
    const response = await userDatasource.getAllUsers(paginationDto);

    expect(response).toEqual(returnWithPaginateDto);
    expect(response.data).toEqual([user]);
    expect(spyGetAll).toHaveBeenCalledWith(paginationDto);
    expect(spyGetAll).toHaveBeenCalledTimes(1);
  });

  test('should return a user by id', async () => {
    const spyGetById = jest.spyOn(userDatasource, 'getUserById');
    const response = await userDatasource.getUserById('123');

    expect(response).toEqual(user);
    expect(response).toHaveProperty('id', '123');
    expect(spyGetById).toHaveBeenCalledWith('123');
    expect(spyGetById).toHaveBeenCalledTimes(1);
  });

  test('should update a user', async () => {
    const [_, updateDto] = UpdateUserDto.create({ id: '00000020f51bb4362eee2a4d', name: 'Paul' });
    const spyUpdate = jest.spyOn(userDatasource, 'updateUser');

    const response = await userDatasource.updateUser(updateDto!);

    expect({ ...response, name: 'Paul' }).toEqual({ ...user, name: 'Paul' });
    expect({ ...response, name: 'Paul' }).toHaveProperty('name', 'Paul');
    expect(spyUpdate).toHaveBeenCalledWith(updateDto);
    expect(spyUpdate).toHaveBeenCalledTimes(1);
  });

  test('should delete a user', async () => {
    const spyDelete = jest.spyOn(userDatasource, 'deleteUser');
    const response = await userDatasource.deleteUser('123');

    expect(response).toEqual(user);
    expect(response).toHaveProperty('id', '123');
    expect(spyDelete).toHaveBeenCalledWith('123');
    expect(spyDelete).toHaveBeenCalledTimes(1);
  });
});
