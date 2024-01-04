import { Router } from 'express';

import { AuthController } from './controller';
import { AuthServices } from '@presentation/service/auth.service';
import { AuthRespositoryImpl } from '@infrastructure/repository';
import { AuthDatasourceImpl } from '@infrastructure/datasource';
import { User } from '@data/mongo/models';

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
