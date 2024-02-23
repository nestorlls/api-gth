import { Router } from 'express';

import { Property, User } from '@data/mongo/models';
import { UserDataSourceImpl } from '@infrastructure/datasource';
import { UserRepositoryImpl } from '@infrastructure/repository';
import { AuthMiddleware } from '@presentation/middlewares';
import { UserServices } from '@presentation/service';
import { UserController } from './controller';

export class UserRoutes {
  static get routes(): Router {
    const router = Router();

    const datasource = new UserDataSourceImpl(User, Property);
    const repository = new UserRepositoryImpl(datasource);
    const service = new UserServices(repository);
    const controller = new UserController(service);

    router.use(AuthMiddleware.authenticate);

    router.get('/', controller.getAllUsers);
    router.get('/:id', controller.getUserById);
    router.patch('/:id', controller.updateUser);
    router.delete('/:id', controller.deleteUser);

    return router;
  }
}
