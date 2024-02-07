import mongoose from 'mongoose';
import { envs } from '../../../src/config/environments';
import { MongoDB } from '../../../src/data/mongo/connection/mongo.connection';
import { FavoriteContactDatasourceImpl } from '../../../src/infrastructure/datasource';
import { FavoriteAndContacted, Property, User } from '../../../src/data/mongo/models';
import { CustomeError } from '../../../src/domain/errors';

describe('Test Favorite and Contact Datasource', () => {
  beforeAll(async () => {
    const mongo = new MongoDB();
    await mongo.connection({
      mongoUrl: envs.MONGO_DB_URL,
      dbName: envs.MONGO_DB_NAME,
    });
  });

  beforeEach(async () => {
    await Property.deleteMany({});
    await User.deleteMany({});
    await FavoriteAndContacted.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  // instance of PropertyDatasource
  const mockFavoriteContactDatasourceImpl = new FavoriteContactDatasourceImpl(FavoriteAndContacted);
  const data = {
    user: '507f191e810c19729de860ea',
    property: '507f1f77bcf86cd799439011',
    contacted: false,
    favorite: true,
  };

  test('should create add as favorite', async () => {
    const spyAddAsFavorite = jest.spyOn(mockFavoriteContactDatasourceImpl, 'addFavorite');

    await mockFavoriteContactDatasourceImpl.addFavorite(data);

    expect(spyAddAsFavorite).toHaveBeenCalled();
    expect(spyAddAsFavorite).toHaveBeenCalledWith(data);
    expect(spyAddAsFavorite).toHaveBeenCalledTimes(1);
    expect(mockFavoriteContactDatasourceImpl.addFavorite).toHaveBeenCalledWith(data);
  });

  test('should create remove as favorite', async () => {
    const favorite = await FavoriteAndContacted.create(data);
    const spyRemoveAsFavorite = jest.spyOn(mockFavoriteContactDatasourceImpl, 'removeFavorite');

    await mockFavoriteContactDatasourceImpl.removeFavorite(favorite.id);

    expect(spyRemoveAsFavorite).toHaveBeenCalled();
    expect(spyRemoveAsFavorite).toHaveBeenCalledWith(favorite.id);
    expect(spyRemoveAsFavorite).toHaveBeenCalledTimes(1);
    expect(mockFavoriteContactDatasourceImpl.removeFavorite).toHaveBeenCalledWith(favorite.id);
  });

  test('should create contact advertiser', async () => {
    const spyContactAdvertiser = jest.spyOn(mockFavoriteContactDatasourceImpl, 'contactAdvertiser');

    await mockFavoriteContactDatasourceImpl.contactAdvertiser(data);

    expect(spyContactAdvertiser).toHaveBeenCalled();
    expect(spyContactAdvertiser).toHaveBeenCalledWith(data);
    expect(spyContactAdvertiser).toHaveBeenCalledTimes(1);
    expect(mockFavoriteContactDatasourceImpl.contactAdvertiser).toHaveBeenCalledWith(data);
  });

  test('should get favorites and contacted properties', async () => {
    const user = await User.create({
      name: 'test',
      email: 'test',
      password: 'test',
      phone: 'test',
      role: 'homeseeker',
    });

    const property = await Property.create({
      type: 'rent',
      address: 'address test create property',
      rent: 100,
      maintance: 100,
      price: 0,
      propertyType: 'flat',
      bedRooms: 1,
      bathRooms: 1,
      description: 'test description crate property test',
      petAllowed: false,
      area: 100,
      images: [],
      status: 'active',
      user: user.id,
    });
    const spyGetFavoritesAndContactedProperties = jest.spyOn(
      mockFavoriteContactDatasourceImpl,
      'getFavoritesAndContactedProperties',
    );

    await mockFavoriteContactDatasourceImpl.getFavoritesAndContactedProperties(user.id);

    expect(spyGetFavoritesAndContactedProperties).toHaveBeenCalled();
  });
});
