import { Router } from 'express';

import { AuthRoutes } from './controllers/auth';
import { UserRoutes } from './controllers/user';
import { PropertyRoutes } from './controllers/property';

export class Routes {
  static routes(apiUrl: string): Router {
    const router = Router();
    const apiRouter = Router();

    apiRouter.use('/auth', AuthRoutes.routes);
    apiRouter.use('/users', UserRoutes.routes);
    apiRouter.use('/properties', PropertyRoutes.routes);

    router.use(apiUrl, apiRouter);

    return router;
  }
}
