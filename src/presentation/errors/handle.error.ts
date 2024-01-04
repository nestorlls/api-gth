import { Response } from 'express';
import { CustomeError } from '@domain/errors';

export class HandleError {
  static handle(error: unknown, res: Response) {
    if (error instanceof CustomeError) {
      return res.status(error.statusCode).json({
        name: error.name,
        statusCode: error.statusCode,
        message: error.message,
      });
    }

    return res.status(500).json({
      statusCode: 500,
      message: 'Internal Server Error',
    });
  }
}
