import { PaginationDto } from '../../../../src/domain/dtos';

describe('Test pagination dto', () => {
  const pagination = {
    page: 1,
    limit: 5,
  };

  test('should return a valid object of paginationDto', () => {
    const [error, paginationDto] = PaginationDto.create(pagination);

    expect(error).toBeUndefined();
    expect(paginationDto).toMatchObject(pagination);
    expect(paginationDto).toHaveProperty('page');
  });

  test('should throw an error with invalid properties', () => {
    const paginationdata = { page: 0, limit: 0 };

    const [error, paginationDto] = PaginationDto.create(paginationdata);

    expect(paginationDto).toBeUndefined();
    expect(error).toBeInstanceOf(Error);
    expect(error).toHaveProperty('message', 'Page and limit must be greater than 0');
  });
});
