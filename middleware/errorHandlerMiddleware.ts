import type { ErrorRequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

const errorHandlerMiddleware: ErrorRequestHandler = (err, _req, res, _next) => {
  console.log(err);
  const statusCode =
    (err as { statusCode?: number })?.statusCode ?? StatusCodes.INTERNAL_SERVER_ERROR;
  const msg =
    (err as { message?: string })?.message ?? 'something went wrong, try again later';
  res.status(statusCode).json({ msg });
};

export default errorHandlerMiddleware;
