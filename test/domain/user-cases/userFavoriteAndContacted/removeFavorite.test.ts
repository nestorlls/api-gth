import { RemoveFavorite } from '../../../../src/domain/use-cases/userFavoritesAndContacted';
import { mockFavoriteContactedService } from './mock/FavoriteContactService.mock';

describe('Test remove favorite Use Case', () => {
  test('should call remove favorite use case', () => {
    const removeFavorite = new RemoveFavorite(mockFavoriteContactedService);
    const favoriteId = '1';

    const result = removeFavorite.execute(favoriteId);

    expect(result).toEqual(expect.any(Object));
    expect(mockFavoriteContactedService.removeFavorite).toHaveBeenCalledWith(favoriteId);
    expect(mockFavoriteContactedService.removeFavorite).toHaveBeenCalledTimes(1);
  });
});
