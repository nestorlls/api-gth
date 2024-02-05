import { FavoriteContactDatasource } from '../../../src/domain/abstracts/datasource';
import { CreateFavoriteContactAdvDto } from '../../../src/domain/dtos';
import { FavoriteContactRepositoryImpl } from '../../../src/infrastructure/repository';

describe('Test Favorite and Contact Repository', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockFavoriteContactDatasource: FavoriteContactDatasource = {
    getFavoritesAndContactedProperties: jest.fn(),
    addFavorite: jest.fn(),
    removeFavorite: jest.fn(),
    contactAdvertiser: jest.fn(),
    unContactedAdvertiser: jest.fn(),
  };

  const favoriteContactRepositoryImpl = new FavoriteContactRepositoryImpl(mockFavoriteContactDatasource);
  const userId = '123';

  test('should get favorites and contacted properties', async () => {
    const spyGetFavoritesAndContactedProperties = jest.spyOn(
      mockFavoriteContactDatasource,
      'getFavoritesAndContactedProperties',
    );

    await favoriteContactRepositoryImpl.getFavoritesAndContactedProperties(userId);

    expect(spyGetFavoritesAndContactedProperties).toHaveBeenCalled();
    expect(spyGetFavoritesAndContactedProperties).toHaveBeenCalledWith(userId);
    expect(spyGetFavoritesAndContactedProperties).toHaveBeenCalledTimes(1);
    expect(mockFavoriteContactDatasource.getFavoritesAndContactedProperties).toHaveBeenCalledWith(userId);
  });

  test('should add favorite', async () => {
    const spyAddFavorite = jest.spyOn(mockFavoriteContactDatasource, 'addFavorite');
    const [_, favoriteDto] = CreateFavoriteContactAdvDto.create({
      user: '507f191e810c19729de860ea',
      property: '507f191e810c19729de860ea',
      favorite: true,
    });

    await favoriteContactRepositoryImpl.addFavorite(favoriteDto!);

    expect(spyAddFavorite).toHaveBeenCalled();
    expect(spyAddFavorite).toHaveBeenCalledWith(favoriteDto);
    expect(spyAddFavorite).toHaveBeenCalledTimes(1);
    expect(mockFavoriteContactDatasource.addFavorite).toHaveBeenCalledWith(favoriteDto);
  });

  test('should remove favorite', async () => {
    const spyRemoveFavorite = jest.spyOn(mockFavoriteContactDatasource, 'removeFavorite');
    const favoriteId = '507f191e810c19729de860ea';

    await favoriteContactRepositoryImpl.removeFavorite(favoriteId);

    expect(spyRemoveFavorite).toHaveBeenCalled();
    expect(spyRemoveFavorite).toHaveBeenCalledWith(favoriteId);
    expect(spyRemoveFavorite).toHaveBeenCalledTimes(1);
    expect(mockFavoriteContactDatasource.removeFavorite).toHaveBeenCalledWith(favoriteId);
  });

  test('should contact advertiser', async () => {
    const spyContactAdvertiser = jest.spyOn(mockFavoriteContactDatasource, 'contactAdvertiser');
    const contactedDto = CreateFavoriteContactAdvDto.create({
      user: '507f191e810c19729de860ea',
      property: '507f191e810c19729de860ea',
      contacted: true,
    })[1];

    await favoriteContactRepositoryImpl.contactAdvertiser(contactedDto!);

    expect(spyContactAdvertiser).toHaveBeenCalled();
    expect(spyContactAdvertiser).toHaveBeenCalledWith(contactedDto);
    expect(spyContactAdvertiser).toHaveBeenCalledTimes(1);
    expect(mockFavoriteContactDatasource.contactAdvertiser).toHaveBeenCalledWith(contactedDto);
  });

  test('should remove contacted advertiser', async () => {
    const spyUnContactedAdvertiser = jest.spyOn(mockFavoriteContactDatasource, 'unContactedAdvertiser');
    const contactedId = '507f191e810c19729de860ea';

    await favoriteContactRepositoryImpl.unContactedAdvertiser(contactedId);

    expect(spyUnContactedAdvertiser).toHaveBeenCalled();
    expect(spyUnContactedAdvertiser).toHaveBeenCalledWith(contactedId);
    expect(spyUnContactedAdvertiser).toHaveBeenCalledTimes(1);
    expect(mockFavoriteContactDatasource.unContactedAdvertiser).toHaveBeenCalledWith(contactedId);
  });
});
