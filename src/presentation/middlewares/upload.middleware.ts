import fs from 'fs';
import path from 'path';
import multer from 'multer';
import { NextFunction, Request, Response } from 'express';

import { Uuid } from '@config/adapters';

export class UploadMiddleware {
  static uploadFile = (req: Request, res: Response, next: NextFunction) => {
    const type = req.url.split('/').at(-1) as string;
    const filePath = path.resolve(__dirname, '../../../uploads', type);

    const isPathExists = fs.existsSync(filePath);
    if (!isPathExists) {
      fs.mkdirSync(filePath, { recursive: true });
    }

    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, filePath);
      },
      filename: function (req, file, cb) {
        const extension = path.extname(file.originalname);
        const filename = `${Uuid.v4()}${extension}`;
        cb(null, filename);
      },
    });

    const upload = multer({
      storage,
      limits: {
        fileSize: 1024 * 1024 * 5,
      },
      fileFilter: (req, file, cb) => {
        const validExtensions = ['.png', '.jpg', '.jpeg'];
        const ext = path.extname(file.originalname);
        if (!validExtensions.includes(path.extname(file.originalname))) {
          return cb(new Error(`Invalid file type '${ext}'. Valid types: ${validExtensions.join(', ')}`));
        }
        cb(null, true);
      },
    });

    upload.array('files', 5)(req, res, (err) => {
      if (err) {
        return res.status(400).send({
          status: 400,
          message: err.message,
        });
      }

      if (!req.files) {
        return res.status(400).send({
          status: 400,
          message: 'No file uploaded',
        });
      }
      req.body.files = req.files;
      req.body.type = type;

      next();
    });
  };

  static validateType = (req: Request, res: Response, next: NextFunction) => {
    const type = req.url.split('/').pop() as string;
    const validTypes = ['property', 'user'];

    if (!validTypes.includes(type)) {
      return res.status(400).json({ message: `Invalid type '${type}'. Valid types: ${validTypes.join(', ')}` });
    }
    next();
  };
}
