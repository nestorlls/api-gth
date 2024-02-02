import mongoose from 'mongoose';

import { Property } from '../../../src/data/mongo/models/property.model';
import { envs } from '../../../src/config/environments';
import { MongoDB } from '../../../src/data/mongo/connection/mongo.connection';

describe('Test data/models/property.model.ts', () => {
  beforeAll(async () => {
    const mongoDb = new MongoDB();
    await mongoDb.connection({
      mongoUrl: envs.MONGO_DB_URL,
      dbName: envs.MONGO_DB_NAME,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test('should return a property model', async () => {
    const data = {
      type: 'rent',
      address: 'address test',
      rent: 100,
      maintance: 100,
      price: 0,
      propertyType: 'flat',
      bedRooms: 1,
      bathRooms: 1,
      petAllowed: false,
      area: 100,
      description: 'description test',
      images: [],
      status: 'active',
      user: '507f191e810c19729de860ea',
    };

    const property = await Property.create(data);
    const result = JSON.parse(JSON.stringify(property.toJSON()));

    expect(result).toEqual(
      expect.objectContaining({
        ...data,
        id: expect.any(String),
      }),
    );

    await Property.findByIdAndDelete(result.id);
  });
});
