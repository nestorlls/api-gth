import { Router } from 'express';
import { UploadController } from './controller';
import { UploadService } from '@presentation/service';
import { CloudinaryAdapter } from '@config/adapters';
import { envs } from '@config/environments';
import { UploadMiddleware } from '@presentation/middlewares';

export class UploadRouter {
  static get routes() {
    const router = Router();

    const { CLOUD_NAME, API_KEY, API_SECRET } = envs;

    const cloudinary = new CloudinaryAdapter(CLOUD_NAME, API_KEY, API_SECRET);
    const service = new UploadService(cloudinary);
    const controller = new UploadController(service);

    router.use(UploadMiddleware.validateType);

    router.post('/:type', [UploadMiddleware.uploadFile], controller.uploadFile);
    router.delete('/:type', controller.deleteFile);

    return router;
  }
}
