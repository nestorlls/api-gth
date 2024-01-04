import { Router } from 'express';

import { PropertyController } from './controller';
import { PropertyServices } from '@presentation/service';
import { PropertyRepositoryImpl } from '@infrastructure/repository';
import { PropertyDataSourceImpl } from '@infrastructure/datasource';
import { Property } from '@data/mongo/models';
import { AuthMiddleware } from '@presentation/middlewares';

export class PropertyRoutes {
  static get routes(): Router {
    const router = Router();

    const datasource = new PropertyDataSourceImpl(Property);
    const repository = new PropertyRepositoryImpl(datasource);
    const service = new PropertyServices(repository);
    const controller = new PropertyController(service);

    router.get('/', controller.getAllProperties);
    router.get('/:id', controller.getPropertyById);
    router.post('/', [AuthMiddleware.authenticate], controller.createProperty);
    router.patch('/:id', [AuthMiddleware.authenticate], controller.updateProperty);
    router.delete('/:id', [AuthMiddleware.authenticate], controller.deleteProperty);

    return router;
  }
}
