import fs from 'fs';
import path from 'path';
import multer from 'multer';
import { NextFunction, Request, Response } from 'express';

import { Uuid } from '@config/adapters';

export class UploadMiddleware {
  static uploadFile(req: Request, res: Response, next: NextFunction) {
    const type = req.url.split('/').at(-1);
    const pathFile = path.resolve(__dirname, '../../..', `uploads/${type}`);

    const storage = multer.diskStorage({
      destination: function (req, file, callback) {
        callback(null, pathFile);
      },
      filename: function (req, file, callback) {
        const ext = file.originalname.split('.').pop();
        const fileName = `${Uuid.v4()}.${ext}`;
        callback(null, fileName);
      },
    });

    const upload = multer({
      storage,
      limits: {
        fileSize: 5 * 1024 * 1024,
      },
    });

    const exists = fs.existsSync(pathFile);
    if (!exists) {
      fs.mkdirSync(pathFile);
    }

    upload.array('file')(req, res, (err) => {
      if (err) {
        return res.status(400).json({
          error: err.message,
        });
      }

      if (!req.files) {
        return res.status(400).json({
          error: 'No files were uploaded.',
        });
      }
      next();
    });
  }
}
