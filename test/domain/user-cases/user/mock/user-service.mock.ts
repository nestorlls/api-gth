export const mockUserService = {
  getAllUsers: jest.fn().mockReturnValue([]),
  getUserById: jest.fn().mockReturnValue({}),
  updateUser: jest.fn().mockReturnValue({}),
  deleteUser: jest.fn().mockReturnValue({}),
};
