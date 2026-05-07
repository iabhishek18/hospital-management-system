export class AppError extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly code: string,
    message: string,
    public readonly details?: unknown
  ) {
    super(message);
    this.name = 'AppError';
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(code: string, message: string, details?: unknown): AppError {
    return new AppError(400, code, message, details);
  }

  static notFound(resource: string, id: string): AppError {
    return new AppError(404, 'RESOURCE_NOT_FOUND', `${resource} with id '${id}' not found`);
  }

  static conflict(code: string, message: string): AppError {
    return new AppError(409, code, message);
  }

  static forbidden(message: string): AppError {
    return new AppError(403, 'FORBIDDEN', message);
  }

  static internal(message: string): AppError {
    return new AppError(500, 'INTERNAL_ERROR', message);
  }
}
