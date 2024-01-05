import { Router } from 'express';

import { FavoriteController } from './controller';
import { FavoriteServices } from '@presentation/service';
import { FavoriteRepositoryImpl } from '@infrastructure/repository';
import { FavoriteDatasourceImpl } from '@infrastructure/datasource';
import { Favorite } from '@data/mongo/models';
import { AuthMiddleware } from '@presentation/middlewares';

export class FavoriteRoutes {
  static get routes(): Router {
    const router = Router();

    const datasource = new FavoriteDatasourceImpl(Favorite);
    const repository = new FavoriteRepositoryImpl(datasource);
    const service = new FavoriteServices(repository);
    const controller = new FavoriteController(service);

    router.use(AuthMiddleware.authenticate);

    router.get('/', controller.getUserFavorites);
    router.post('/:property', controller.addFavorite);
    router.delete('/:id', controller.removeFavorite);

    return router;
  }
}
