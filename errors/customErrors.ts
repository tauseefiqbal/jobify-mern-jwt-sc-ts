import { StatusCodes } from 'http-status-codes';

export class AppError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(message, StatusCodes.NOT_FOUND);
    this.name = 'NotFoundError';
  }
}

export class BadRequestError extends AppError {
  constructor(message: string | string[]) {
    super(Array.isArray(message) ? message.join(', ') : message, StatusCodes.BAD_REQUEST);
    this.name = 'BadRequestError';
  }
}

export class UnauthenticatedError extends AppError {
  constructor(message: string) {
    super(message, StatusCodes.UNAUTHORIZED);
    this.name = 'UnauthenticatedError';
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string) {
    super(message, StatusCodes.FORBIDDEN);
    this.name = 'UnauthorizedError';
  }
}
