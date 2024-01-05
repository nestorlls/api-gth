import { Router } from 'express';
import { ContactAdvetiserController } from './controller';
import { FavoriteContactServices } from '@presentation/service';
import { FavoriteContactRepositoryImpl } from '@infrastructure/repository';
import { FavoriteContactDatasourceImpl } from '@infrastructure/datasource';
import { FavoriteAndContacted } from '@data/mongo/models';
import { AuthMiddleware } from '@presentation/middlewares';

export class ContactAdvertiserRoutes {
  static get routes() {
    const router = Router();

    const datasource = new FavoriteContactDatasourceImpl(FavoriteAndContacted);
    const repository = new FavoriteContactRepositoryImpl(datasource);
    const service = new FavoriteContactServices(repository);
    const controller = new ContactAdvetiserController(service);

    router.use(AuthMiddleware.authenticate);

    router.patch('/:property', controller.contactAdvertiser);
    router.delete('/:id', controller.unContactAdvertiser);

    return router;
  }
}
