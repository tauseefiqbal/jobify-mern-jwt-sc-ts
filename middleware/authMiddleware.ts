import type { Request, Response, NextFunction, RequestHandler } from 'express';
import {
  UnauthenticatedError,
  UnauthorizedError,
  BadRequestError,
} from '../errors/customErrors.js';
import { verifyJWT } from '../utils/tokenUtils.js';

export const authenticateUser: RequestHandler = (req, _res, next) => {
  const { token } = req.cookies as { token?: string };
  if (!token) throw new UnauthenticatedError('authentication invalid');

  try {
    const { userId, role } = verifyJWT(token);
    const testUser = userId === '64b2c07ccac2efc972ab0eca';
    req.user = { userId, role, testUser };
    next();
  } catch {
    throw new UnauthenticatedError('authentication invalid');
  }
};

export const authorizePermissions = (...roles: string[]): RequestHandler => {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError('Unauthorized to access this route');
    }
    next();
  };
};

export const checkForTestUser: RequestHandler = (req, _res, next) => {
  if (req.user.testUser) throw new BadRequestError('Demo User. Read Only!');
  next();
};
