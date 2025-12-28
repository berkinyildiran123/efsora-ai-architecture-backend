import cors from 'cors'
import express, { ErrorRequestHandler, Express, Handler, Router } from 'express'
import { Server } from 'http'
import { Knex } from 'knex'

import { ConfigService } from './config'

export class App {
  private readonly app: Express
  private server: Server | undefined

  constructor(
    private config: ConfigService,
    private database: Knex,
  ) {
    this.app = express()
    this.app.use(cors())

    const parser = express.json()
    this.app.use(parser)

    this.app.get('/', (_req, res) => res.send('OK').status(200))
  }

  start = async (): Promise<void> => {
    try {
      const port = this.config.find('SERVER_PORT')
      this.server = this.app.listen(port)
    } catch (err) {
      await this.stop()
    }
  }

  stop = async (): Promise<void> => {
    try {
      if (this.server !== undefined) this.server.close()
      await this.database.destroy()

      process.exit(0)
    } catch (err) {
      process.exit(1)
    }
  }

  useMiddleware(handler: ErrorRequestHandler | Handler): void {
    this.app.use(handler)
  }

  useRouter(name: string, router: Router): void {
    this.app.use(name, router)
  }
}
