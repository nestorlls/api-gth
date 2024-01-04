import { envs } from '@config/environments';
import { MongoDB } from '@data/mongo/connection/mongo.connection';
import { Routes } from '@presentation/rourtes';
import { Server } from '@presentation/server';

(async () => {
  await main();
})();

async function main() {
  const { PORT, API_NAME, MONGO_DB_URL, MONGO_DB_NAME } = envs;
  const mongoDB = new MongoDB();
  const connected = await mongoDB.connection({ mongoUrl: MONGO_DB_URL, dbName: MONGO_DB_NAME });

  const server = new Server({
    port: PORT,
    apiname: API_NAME,
    routes: Routes.getRoutes(),
  });

  if (connected) {
    console.log('MongoDB connected successfully!');
    server.start();
  }
}
