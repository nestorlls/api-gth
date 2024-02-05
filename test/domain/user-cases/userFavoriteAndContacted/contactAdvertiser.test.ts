import { ContactAdvertiser } from '../../../../src/domain/use-cases/userFavoritesAndContacted';
import { mockFavoriteContactedService } from './mock/FavoriteContactService.mock';

describe('Test Contacted Advertiser Use Case', () => {
  test('should call contact advertiser use case', () => {
    const contactAdv = new ContactAdvertiser(mockFavoriteContactedService);
    const contactAdvDto = {
      user: '1',
      property: '2',
    };

    const result = contactAdv.execute(contactAdvDto);

    expect(result).toEqual(expect.any(Object));
    expect(mockFavoriteContactedService.contactAdvertiser).toHaveBeenCalledWith(contactAdvDto);
    expect(mockFavoriteContactedService.contactAdvertiser).toHaveBeenCalledTimes(1);
  });
});
