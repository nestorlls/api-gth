import { UnContactAdvertiser } from '../../../../src/domain/use-cases/userFavoritesAndContacted';
import { mockFavoriteContactedService } from './mock/favoriteContactService.mock';

describe('Test Un Contacted Advertiser Use Case', () => {
  test('should call unContactedAdvertiser use case', () => {
    const uncontacted = new UnContactAdvertiser(mockFavoriteContactedService);
    const favoriteId = '1';

    const result = uncontacted.execute(favoriteId);

    expect(result).toEqual(expect.any(Object));
    expect(mockFavoriteContactedService.unContactedAdvertiser).toHaveBeenCalledWith(favoriteId);
    expect(mockFavoriteContactedService.unContactedAdvertiser).toHaveBeenCalledTimes(1);
  });
});
