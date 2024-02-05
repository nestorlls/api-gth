import { DeleteUser } from '../../../../src/domain/use-cases/user';
import { mockUserService } from './mock/user-service.mock';

describe('Test Delete user  Use Case', () => {
  test('should call delete user  use case', () => {
    const deleteUserById = new DeleteUser(mockUserService);
    const userId = '1';

    const result = deleteUserById.execute(userId);

    expect(result).toEqual(expect.any(Object));
    expect(mockUserService.deleteUser).toHaveBeenCalledWith(userId);
    expect(mockUserService.deleteUser).toHaveBeenCalledTimes(1);
  });
});
