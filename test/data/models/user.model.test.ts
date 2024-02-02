import mongoose from 'mongoose';

import { User } from '../../../src/data/mongo/models/user.model';
import { MongoDB } from '../../../src/data/mongo/connection/mongo.connection';
import { envs } from '../../../src/config/environments';

describe('Test data/models/user.model.ts', () => {
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

  test('should create a user model', async () => {
    const data = {
      name: 'test name',
      email: 'test email',
      password: 'test password hashed',
      phone: '999999999',
      avatar: 'url avatar',
    };

    const { password, ...rest } = data;

    const user = await User.create(data);
    const result = JSON.parse(JSON.stringify(user.toJSON()));

    expect(result).toEqual(
      expect.objectContaining({
        ...rest,
        role: ['homeseeker'],
        id: expect.any(String),
      }),
    );

    await User.findByIdAndDelete(result.id);
  });
});
