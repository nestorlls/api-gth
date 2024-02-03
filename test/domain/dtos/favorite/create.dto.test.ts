import { CreateFavoriteContactAdvDto } from '../../../../src/domain/dtos';

describe('Test Create Favorite Dto', () => {
  test('should create a valid object favoriteDto with valid properties', () => {
    const props = {
      user: '507f191e810c19729de860ea',
      property: '507f191e810c19729de860ea',
      favorite: true,
    };

    const [error, favoriteDto] = CreateFavoriteContactAdvDto.create(props);

    expect(error).toBeUndefined();
    expect(favoriteDto).toMatchObject(props);
    expect(favoriteDto).toBeInstanceOf(CreateFavoriteContactAdvDto);
    expect(favoriteDto).toHaveProperty('user');
    expect(favoriteDto).toHaveProperty('property');
    expect(favoriteDto).toHaveProperty('favorite');
  });

  test('should throw an error with invalid properties', () => {
    const props = {
      user: '123',
      property: '507f191e810c19729de860ereaer4783s7f878270173ydiuhaoi83a',
      favorite: 'true',
    };

    try {
      const [error, favoriteDto] = CreateFavoriteContactAdvDto.create(props);
      expect(error).toBeUndefined();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error).toHaveProperty('message');
    }
  });
});
