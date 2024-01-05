import { Router } from 'express';

import { AuthRoutes } from './controllers/auth';
import { UserRoutes } from './controllers/user';
import { PropertyRoutes } from './controllers/property';
import { FavoriteRoutes } from './controllers/favorite';
import { ContactAdvertiserRoutes } from './controllers/contactAdvertiser';

export class Routes {
  static routes(apiUrl: string): Router {
    const router = Router();
    const apiRouter = Router();

    apiRouter.use('/auth', AuthRoutes.routes);
    apiRouter.use('/users', UserRoutes.routes);
    apiRouter.use('/properties', PropertyRoutes.routes);
    apiRouter.use('/favorites', FavoriteRoutes.routes);
    apiRouter.use('/contact-advertiser', ContactAdvertiserRoutes.routes);

    router.use(apiUrl, apiRouter);

    return router;
  }
}
