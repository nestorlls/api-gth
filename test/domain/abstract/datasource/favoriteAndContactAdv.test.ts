import { FavoriteContactDatasource } from '../../../../src/domain/abstracts/datasource/favoriteAndContactAdv';
import { FavoriteContactedEntity } from '../../../../src/domain/entities';
import { CreateFavoriteContactAdvDto } from '../../../../src/domain/dtos';

describe('Test Property datasource abstract class', () => {
  const favoriteEntity = new FavoriteContactedEntity({
    id: '507f191e810c19729de860ea',
    property: '00000020f51bb4362eee2a4d',
    user: '507f191e810c19729de860ea',
    favorite: true,
    contacted: false,
  });

  const contactedEntity = new FavoriteContactedEntity({
    id: '507f191e810c19729de860ea',
    property: '00000020f51bb4362eee2a4d',
    user: '507f191e810c19729de860ea',
    favorite: false,
    contacted: true,
  });

  class FavoriteAndContactAdvMock extends FavoriteContactDatasource {
    async getFavoritesAndContactedProperties(user: string): Promise<FavoriteContactedEntity[]> {
      return [favoriteEntity, contactedEntity];
    }

    async addFavorite(dto: CreateFavoriteContactAdvDto): Promise<FavoriteContactedEntity> {
      return favoriteEntity;
    }
    async removeFavorite(id: string): Promise<FavoriteContactedEntity> {
      return favoriteEntity;
    }
    async contactAdvertiser(dto: CreateFavoriteContactAdvDto): Promise<FavoriteContactedEntity> {
      return contactedEntity;
    }
    async unContactedAdvertiser(id: string): Promise<FavoriteContactedEntity> {
      return contactedEntity;
    }
  }

  const favoriteContactMock = new FavoriteAndContactAdvMock();

  test('should instance of PropertyDatasource', () => {
    expect(favoriteContactMock).toBeInstanceOf(FavoriteContactDatasource);
    expect(favoriteContactMock).toHaveProperty('getFavoritesAndContactedProperties');
    expect(favoriteContactMock).toHaveProperty('addFavorite');
    expect(favoriteContactMock).toHaveProperty('removeFavorite');
    expect(favoriteContactMock).toHaveProperty('contactAdvertiser');
    expect(favoriteContactMock).toHaveProperty('unContactedAdvertiser');
  });

  test('should return favorites and contacted properties', async () => {
    const spyGetFavAndContProperties = jest.spyOn(favoriteContactMock, 'getFavoritesAndContactedProperties');
    const properties = await favoriteContactMock.getFavoritesAndContactedProperties(favoriteEntity.user);

    expect(properties).toContain(favoriteEntity);
    expect(spyGetFavAndContProperties).toHaveBeenCalledWith(favoriteEntity.user);
    expect(spyGetFavAndContProperties).toHaveBeenCalledTimes(1);
  });

  test('should add a favorite', async () => {
    const spyAddFavorite = jest.spyOn(favoriteContactMock, 'addFavorite');
    const [_, favoriteDto] = CreateFavoriteContactAdvDto.create({
      user: '507f191e810c19729de860ea',
      property: '507f191e810c19729de860ea',
      favorite: true,
    });

    const response = await favoriteContactMock.addFavorite(favoriteDto!);

    expect(response).toEqual(favoriteEntity);
    expect(spyAddFavorite).toHaveBeenCalledWith(favoriteDto);
    expect(spyAddFavorite).toHaveBeenCalledTimes(1);
  });

  test('should remove a favorite', async () => {
    const spyRemoveFavorite = jest.spyOn(favoriteContactMock, 'removeFavorite');
    const response = await favoriteContactMock.removeFavorite(favoriteEntity.id);

    expect(response).toEqual(favoriteEntity);
    expect(spyRemoveFavorite).toHaveBeenCalledWith(favoriteEntity.id);
    expect(spyRemoveFavorite).toHaveBeenCalledTimes(1);
  });

  test('should add contacted advertiser', async () => {
    const spyContactAdvertiser = jest.spyOn(favoriteContactMock, 'contactAdvertiser');
    const [_, contactDto] = CreateFavoriteContactAdvDto.create({
      user: '507f191e810c19729de860ea',
      property: '507f191e810c19729de860ea',
      contacted: true,
    });

    const response = await favoriteContactMock.contactAdvertiser(contactDto!);

    expect(response).toEqual(contactedEntity);
    expect(spyContactAdvertiser).toHaveBeenCalledWith(contactDto);
    expect(spyContactAdvertiser).toHaveBeenCalledTimes(1);
  });

  test('should remove contacted advertiser', async () => {
    const spyUnContactedAdvertiser = jest.spyOn(favoriteContactMock, 'unContactedAdvertiser');
    const response = await favoriteContactMock.unContactedAdvertiser(contactedEntity.id);

    expect(response).toEqual(contactedEntity);
    expect(spyUnContactedAdvertiser).toHaveBeenCalledWith(contactedEntity.id);
    expect(spyUnContactedAdvertiser).toHaveBeenCalledTimes(1);
  });
});
