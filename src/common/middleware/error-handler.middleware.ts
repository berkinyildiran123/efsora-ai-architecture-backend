import { Request, Response, NextFunction } from 'express'

import { AppException } from '../exception/app-exception'
import { HttpException } from '../exception/http-exception'

export const errorHandlerMiddleware = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  let exception = new HttpException('Something went wrong', 502)
  if (err instanceof HttpException) {
    exception = err
  } else if (err instanceof AppException) {
    // continue
  } else {
    // continue
  }

  return res.status(exception.status).json({
    success: false,
    message: exception.message,
  })
}
