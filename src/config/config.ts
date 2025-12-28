import { z } from 'zod'

const schema = z.object({
  AWS_SQS_REGION: z.string(),
  AWS_SQS_ENDPOINT: z.string(),
  AWS_SQS_ACCESS_KEY: z.string(),
  AWS_SQS_SECRET_ACCESS_KEY: z.string(),

  DATABASE_HOST: z.string(),
  DATABASE_PORT: z.coerce.number().int().min(0).max(65535),
  DATABASE_USER: z.string(),
  DATABASE_PASSWORD: z.string(),
  DATABASE_NAME: z.string(),

  JOB_QUEUE_URL: z.string(),

  SERVER_PORT: z.coerce.number().int().min(0).max(65535),
})

export type Config = z.infer<typeof schema>

export function loadConfig(): Config {
  return schema.parse(process.env)
}
