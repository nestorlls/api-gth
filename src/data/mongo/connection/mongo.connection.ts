import mongoose from 'mongoose';
import { CustomeError } from '@domain/errors';

interface IMongoConfig {
  mongoUrl: string;
  dbName: string;
}

export class MongoDB {
  private readonly mongo = mongoose;

  async connection(config: IMongoConfig) {
    const { mongoUrl, dbName } = config;
    try {
      const connected = await this.mongo.connect(mongoUrl, { dbName });
      if (connected.STATES.connected === 1) return true;
    } catch (error) {
      throw CustomeError.internalServerError(`${error}`);
    }
  }

  async disconnect() {
    try {
      await this.mongo.disconnect();
    } catch (error) {
      throw CustomeError.internalServerError(`${error}`);
    }
  }
}
