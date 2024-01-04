import { Router } from 'express';

import { AuthRoutes } from './controllers/auth/routes';

export class Routes {
  static routes(apiUrl: string): Router {
    const router = Router();
    const apiRouter = Router();

    apiRouter.use('/auth', AuthRoutes.routes);

    router.use(apiUrl, apiRouter);

    return router;
  }
}
