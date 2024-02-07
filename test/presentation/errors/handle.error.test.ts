import { Response } from 'express';
import { CustomeError } from '../../../src/domain/errors';
import { HandleError } from '../../../src/presentation/errors/handle.error';

describe('Test Handle Error for Custome error and Error', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should handle a custome error and return a bad request', () => {
    const error = CustomeError.badRequest('Bad Request test');
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    HandleError.handle(error, res as any);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      name: 'Bad Request',
      statusCode: 400,
      message: 'Bad Request test',
    });
  });

  test('should handle an error and return an internal server error', () => {
    const error = new Error('Internal Server Error test');
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    HandleError.handle(error, res as any);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      statusCode: 500,
      message: 'Internal Server Error',
    });
  });
});
