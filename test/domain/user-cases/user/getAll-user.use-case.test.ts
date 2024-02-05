import { GetallUsers } from '../../../../src/domain/use-cases/user';
import { mockUserService } from './mock/user-service.mock';

describe('Test get all users Use Case', () => {
  test('should call get all users use case', () => {
    const getAllUsers = new GetallUsers(mockUserService);
    const panigationDto = { page: 1, limit: 4 };

    const result = getAllUsers.execute(panigationDto!);

    expect(result).toEqual(expect.any(Array));
    expect(mockUserService.getAllUsers).toHaveBeenCalledWith(panigationDto);
    expect(mockUserService.getAllUsers).toHaveBeenCalledTimes(1);
  });
});
