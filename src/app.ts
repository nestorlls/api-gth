import { envs } from '@config/environments';
import { MongoDB } from '@data/mongo/connection/mongo.connection';
import { Routes } from '@presentation/rourtes';
import { Server } from '@presentation/server';

(async () => {
  await main();
})();

async function main() {
  const { PORT, MONGO_DB_URL, MONGO_DB_NAME, API_URL } = envs;
  const mongoDB = new MongoDB();
  const connected = await mongoDB.connection({ mongoUrl: MONGO_DB_URL, dbName: MONGO_DB_NAME });

  const server = new Server({
    port: PORT,
    apiUrl: API_URL,
    routes: Routes.routes(API_URL),
  });

  if (connected) {
    console.log('MongoDB connected successfully!');
    server.start();
  }
}
