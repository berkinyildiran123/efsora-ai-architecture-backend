import { App } from './app'
import { errorHandlerMiddleware } from './common'
import { ConfigService, loadConfig } from './config'
import { createDatabase } from './database'
import { createJobRouter, createJobTable, JobController, JobRepository, JobService } from './job'
import { QueueAdapter, QueueService } from './queue'

async function main(): Promise<void> {
  const config = loadConfig()
  const configService = new ConfigService(config)

  const queueAdapter = new QueueAdapter(configService)
  const queueService = new QueueService(queueAdapter, configService)

  const database = createDatabase(configService)
  await createJobTable(database)

  // Features

  const jobRepository = new JobRepository(database)
  const jobService = new JobService(jobRepository, queueService)
  const jobController = new JobController(jobService)
  const jobRouter = createJobRouter(jobController)

  // Bootstrap

  const app = new App(configService, database)

  app.useRouter('/jobs', jobRouter)
  app.useMiddleware(errorHandlerMiddleware)

  process.once('SIGINT', app.stop)
  await app.start()
}
main()
