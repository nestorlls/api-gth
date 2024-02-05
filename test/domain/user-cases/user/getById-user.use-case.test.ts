import { GetUserById } from '../../../../src/domain/use-cases/user';
import { mockUserService } from './mock/user-service.mock';

describe('Test get user by Id Use Case', () => {
  test('should call get by Id  use case', () => {
    const getUserById = new GetUserById(mockUserService);
    const userId = '1';

    const result = getUserById.execute(userId);

    expect(result).toEqual(expect.any(Object));
    expect(mockUserService.getUserById).toHaveBeenCalledWith(userId);
    expect(mockUserService.getUserById).toHaveBeenCalledTimes(1);
  });
});
