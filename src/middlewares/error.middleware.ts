import { NextFunction, Request, Response } from 'express';
import { HttpException } from '@exceptions/HttpException';
import { logger } from '@utils/logger';

const errorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
  try {
    const status: number = error.status || 500;
    const message: string = error.message || 'Something went wrong';
    const code: string = error.code || '';

    console.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}, Code:: ${code}`);
    logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}, Code:: ${code}`);
    res.status(status).json({ status: 'error', message, code });
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
