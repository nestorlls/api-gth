import { GetFavoritesAndContactedPropeties } from '../../../../src/domain/use-cases/userFavoritesAndContacted';
import { mockFavoriteContactedService } from './mock/FavoriteContactService.mock';

describe('Test Get favorites and contacted properties Use Case', () => {
  test('should call get favorites and contacted properties use case', () => {
    const homeseekerProperties = new GetFavoritesAndContactedPropeties(mockFavoriteContactedService);
    const userId = '1';

    const result = homeseekerProperties.execute(userId);

    expect(result).toEqual(expect.any(Object));
    expect(mockFavoriteContactedService.getFavoritesAndContactedProperties).toHaveBeenCalledWith(userId);
    expect(mockFavoriteContactedService.getFavoritesAndContactedProperties).toHaveBeenCalledTimes(1);
  });
});
