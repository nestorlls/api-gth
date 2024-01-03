export class CustomeError extends Error {
  private constructor(
    public readonly name: string,
    public readonly statusCode: number,
    public readonly message: string,
  ) {
    super(message);
  }

  static badRequest(message: string) {
    return new CustomeError('Bad Request', 400, message);
  }

  static unAuthorized(message: string) {
    return new CustomeError('Unauthorized', 401, message);
  }

  static forbidden(message: string) {
    return new CustomeError('Forbidden', 403, message);
  }

  static notFound(message: string) {
    return new CustomeError('Not Found', 404, message);
  }

  static conflict(message: string) {
    return new CustomeError('Conflict', 409, message);
  }

  static internalServerError(message: string) {
    return new CustomeError('Internal Server Error', 500, message);
  }
}
