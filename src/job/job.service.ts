import { QueueService } from '../queue'

import { Job } from './job'
import { JobRepository } from './job.repository'

import { CreateJobDto } from './dto/create-job.dto'

export class JobService {
  constructor(
    private repository: JobRepository,
    private queue: QueueService,
  ) {}

  async create(dto: CreateJobDto): Promise<Job> {
    const job = await this.repository.create(dto)
    this.queue.send({ type: 'job_created', payload: { id: job.id } })

    return job
  }

  async find(): Promise<Job[]> {
    return this.repository.find()
  }
}
