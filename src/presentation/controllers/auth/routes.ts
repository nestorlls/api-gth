import { Router } from 'express';

import { User } from '@data/mongo/models';
import { AuthDatasourceImpl } from '@infrastructure/datasource';
import { AuthRespositoryImpl } from '@infrastructure/repository';
import { AuthServices } from '@presentation/service';
import { AuthController } from './controller';

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();

    const datasource = new AuthDatasourceImpl(User);
    const repository = new AuthRespositoryImpl(datasource);
    const service = new AuthServices(repository);
    const controller = new AuthController(service);

    router.post('/login', controller.login);
    router.post('/register', controller.register);

    return router;
  }
}
