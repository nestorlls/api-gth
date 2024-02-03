import { FavoriteContactedEntity } from '../../../src/domain/entities';

describe('Test Favorite And Contact Entity', () => {
  test('should create a new Favorite And Contact Entity', () => {
    const favoriteAndContactedEntity = new FavoriteContactedEntity({
      id: '507f191e810c19729de860ea',
      property: '507f191e810c19729de860ea',
      user: '507f191e810c19729de860ea',
      favorite: true,
      contacted: false,
    });

    expect(favoriteAndContactedEntity).toBeInstanceOf(FavoriteContactedEntity);
    expect(favoriteAndContactedEntity).toHaveProperty('id', favoriteAndContactedEntity.id);
    expect(favoriteAndContactedEntity).toHaveProperty('property', favoriteAndContactedEntity.property);
  });

  test('should throw an error if does not pass property', () => {
    expect(() => {
      FavoriteContactedEntity.fromObject({
        id: '507f191e810c19729de860ea',
        property: '',
        user: '507f191e810c19729de860ea',
        favorite: true,
        contacted: false,
      });
    }).toThrow('Missing property');
  });

  test('should throw an error if does not pass user', () => {
    expect(() => {
      FavoriteContactedEntity.fromObject({
        id: '507f191e810c19729de860ea',
        property: '507f191e810c19729de860ea',
        user: '',
        favorite: true,
        contacted: false,
      });
    }).toThrow('Missing user');
  });
});
