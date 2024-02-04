import { CustomeError } from '../../../src/domain/errors';

describe('Test Custom Error', () => {
  test('should create a new instance of CustomeError for badRequest', () => {
    const errorMessage = 'This is bad request';
    const error = CustomeError.badRequest(errorMessage);

    expect(error).toBeInstanceOf(CustomeError);
    expect(error?.name).toEqual('Bad Request');
    expect(error?.statusCode).toEqual(400);
    expect(error?.message).toEqual(errorMessage);
  });

  test('should extend the Error class and have access to its properties and methods', () => {
    const errorMessage = 'This is an error';
    const error = CustomeError.internalServerError(errorMessage);

    expect(error).toBeInstanceOf(Error);
    expect(error?.name).toEqual('Internal Server Error');
    expect(error?.message).toEqual(errorMessage);
    expect(error?.stack).toBeTruthy();
    expect(error?.toString()).toContain(errorMessage);
  });

  test('should create a new instance of CustomeError for unAuthorized', () => {
    const message = 'You are not authorized';
    const error = CustomeError.unAuthorized(message);

    expect(error).toBeInstanceOf(CustomeError);
    expect(error.name).toBe('Unauthorized');
    expect(error.statusCode).toBe(401);
    expect(error.message).toBe(message);
  });

  test('should create a new instance of CustomeError for forbidden', () => {
    const message = 'forbidden error';
    const error = CustomeError.forbidden(message);

    expect(error).toBeInstanceOf(CustomeError);
    expect(error.name).toBe('Forbidden');
    expect(error.statusCode).toBe(403);
    expect(error.message).toBe(message);
  });

  test('should create a new instance of CustomeError for notFound', () => {
    const message = 'not found error';
    const error = CustomeError.notFound(message);

    expect(error).toBeInstanceOf(CustomeError);
    expect(error.name).toBe('Not Found');
    expect(error.statusCode).toBe(404);
    expect(error.message).toBe(message);
  });

  test('should create a new instance of CustomeError for conflict', () => {
    const message = 'conflict error';
    const error = CustomeError.conflict(message);

    expect(error).toBeInstanceOf(CustomeError);
    expect(error.name).toBe('Conflict');
    expect(error.statusCode).toBe(409);
    expect(error.message).toBe(message);
  });

  test('should create a new instance of CustomeError for internalServerError', () => {
    const message = 'internal server error';
    const error = CustomeError.internalServerError(message);

    expect(error).toBeInstanceOf(CustomeError);
    expect(error.name).toBe('Internal Server Error');
    expect(error.statusCode).toBe(500);
    expect(error.message).toBe(message);
  });
});
