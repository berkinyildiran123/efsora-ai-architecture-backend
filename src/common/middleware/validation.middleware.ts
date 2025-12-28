import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

import { HttpException } from '../exception/http-exception'

export const validationMiddleware =
  (target: 'body' | 'query' | 'params', schema: z.Schema) => (req: Request, _res: Response, next: NextFunction) => {
    const data = req[target]
    const parsed = schema.safeParse(data)

    if (parsed.success) {
      req[target] = parsed.data
      next()

      return
    }

    const message = z.prettifyError(parsed.error)
    const exception = new HttpException(message, 400)
    next(exception)
  }
