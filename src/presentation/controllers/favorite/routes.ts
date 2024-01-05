import { Router } from 'express';

import { FavoriteController } from './controller';
import { FavoriteContactServices } from '@presentation/service';
import { FavoriteContactRepositoryImpl } from '@infrastructure/repository';
import { FavoriteContactDatasourceImpl } from '@infrastructure/datasource';
import { FavoriteAndContacted } from '@data/mongo/models';
import { AuthMiddleware } from '@presentation/middlewares';

export class FavoriteRoutes {
  static get routes(): Router {
    const router = Router();

    const datasource = new FavoriteContactDatasourceImpl(FavoriteAndContacted);
    const repository = new FavoriteContactRepositoryImpl(datasource);
    const service = new FavoriteContactServices(repository);
    const controller = new FavoriteController(service);

    router.use(AuthMiddleware.authenticate);

    router.get('/', controller.getFavoritesContactedProperties);
    router.patch('/:property', controller.addFavorite);
    router.delete('/:id', controller.removeFavorite);

    return router;
  }
}
