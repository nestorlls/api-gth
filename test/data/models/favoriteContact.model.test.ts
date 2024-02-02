import mongoose from 'mongoose';

import { FavoriteAndContacted } from '../../../src/data/mongo/models/favoriteContact.model';
import { envs } from '../../../src/config/environments';
import { MongoDB } from '../../../src/data/mongo/connection/mongo.connection';

describe('Test data/models/favoritesContact.model.ts', () => {
  beforeAll(async () => {
    const mongoConnection = new MongoDB();
    await mongoConnection.connection({
      mongoUrl: envs.MONGO_DB_URL!,
      dbName: envs.MONGO_DB_NAME!,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test('should return a favorite and contacted model', async () => {
    const data = {
      user: '507f191e810c19729de860ea',
      property: '507f1f77bcf86cd799439011',
      contacted: false,
      favorite: false,
    };

    const favoriteAndContacted = await FavoriteAndContacted.create(data);
    const result = JSON.parse(JSON.stringify(favoriteAndContacted.toJSON()));

    expect(result).toEqual(
      expect.objectContaining({
        ...data,
        id: expect.any(String),
      }),
    );

    await FavoriteAndContacted.findByIdAndDelete(favoriteAndContacted.id);
  });
});
