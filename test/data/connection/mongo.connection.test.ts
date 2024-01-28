import mongoose from 'mongoose';
import { MongoDB } from './../../../src/data/mongo/connection/mongo.connection';

describe('Test data/connection/mongo.connection.ts', () => {
  const mongoConection = new MongoDB();
  afterAll(() => {
    mongoose.connection.close();
  });

  it('Should connect to MongoDB', async () => {
    const options = {
      mongoUrl: process.env.MONGO_DB_URL!,
      dbName: process.env.MONGO_DB_NAME!,
    };

    const connected = await mongoConection.connection(options);

    expect(connected?.connected).toBe(true);
  });

  it('should throw internal server error when not connected to MongoDB', async () => {
    const options = {
      mongoUrl: 'aeAser',
      dbName: process.env.MONGO_DB_NAME!,
    };

    try {
      await mongoConection.connection(options);
      expect(true).toBe(false);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it('should disconnect from MongoDB', async () => {
    await mongoConection.disconnect();
    expect(mongoose.connection.readyState).toBe(0);
  });
});
