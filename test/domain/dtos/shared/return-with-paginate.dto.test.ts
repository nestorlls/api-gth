import { ReturnWithPaginateDto } from '../../../../src/domain/dtos';

describe('Test Return With Paginate Dto', () => {
  test('should return a valid objet of ReturnWithPaginateDto', () => {
    const props = {
      page: 1,
      limit: 10,
      total: 100,
      next: null,
      prev: null,
      data: [{ name: 'test' }],
    };

    const result = ReturnWithPaginateDto.create<{ name: string }>(props);

    expect(result).toEqual(props);
    expect(result).toBeInstanceOf(ReturnWithPaginateDto);
    expect(result).toHaveProperty('page');
    expect(result).toHaveProperty('limit');
    expect(result).toHaveProperty('total');
  });
});
