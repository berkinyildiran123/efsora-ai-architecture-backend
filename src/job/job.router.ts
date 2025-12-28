import { Request, Response, Router } from 'express'

import { validationMiddleware } from '../common'

import { JobController } from './job.controller'

import { createJobSchema } from './dto/create-job.dto'

export function createJobRouter(controller: JobController): Router {
  const router = Router()

  router.get('/', async (_req: Request, res: Response) => {
    const response = await controller.find()
    res.status(200).json(response)
  })

  router.post('/', validationMiddleware('body', createJobSchema), async (req: Request, res: Response) => {
    const response = await controller.create(req.body)
    res.status(201).json(response)
  })

  return router
}
