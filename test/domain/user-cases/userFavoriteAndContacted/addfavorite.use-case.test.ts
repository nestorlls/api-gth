import { AddFavorite } from '../../../../src/domain/use-cases/userFavoritesAndContacted';
import { mockFavoriteContactedService } from './mock/favoriteContactService.mock';

describe('Test Add property as Favorite Use Case', () => {
  test('should call add to favorite use case', () => {
    const addFavorite = new AddFavorite(mockFavoriteContactedService);
    const createFavoriteContactAdvDto = {
      user: '1',
      property: '2',
      favorite: true,
    };

    const result = addFavorite.execute(createFavoriteContactAdvDto!);

    expect(result).toEqual(expect.any(Object));
    expect(mockFavoriteContactedService.addFavorite).toHaveBeenCalledWith(createFavoriteContactAdvDto);
    expect(mockFavoriteContactedService.addFavorite).toHaveBeenCalledTimes(1);
  });
});
