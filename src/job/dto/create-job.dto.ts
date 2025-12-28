import { z } from 'zod'

export const createJobSchema = z.object({
  description: z.string().min(1).max(1000),
})

export type CreateJobDto = z.infer<typeof createJobSchema>
