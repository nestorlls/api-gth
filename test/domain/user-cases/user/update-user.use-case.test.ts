import { UpdateUser } from '../../../../src/domain/use-cases/user';
import { mockUserService } from './mock/user-service.mock';
import { UpdateUserDto } from '../../../../src/domain/dtos/user';

describe('Test Update User Use Case', () => {
  test('should call update user use case', () => {
    const updateUser = new UpdateUser(mockUserService);
    const updateDto = UpdateUserDto.create({
      id: '2',
      name: 'Paul',
    })[1];

    const result = updateUser.execute(updateDto!);

    expect(result).toEqual(expect.any(Object));
    expect(mockUserService.updateUser).toHaveBeenCalledWith(updateDto);
    expect(mockUserService.updateUser).toHaveBeenCalledTimes(1);
  });
});
