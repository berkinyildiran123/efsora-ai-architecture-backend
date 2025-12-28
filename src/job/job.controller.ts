import { JobService } from './job.service'

import { CreateJobDto } from './dto/create-job.dto'

import { CreateJobResponse } from './response/create-job.response'
import { FindJobsResponse } from './response/find-jobs.response'

export class JobController {
  constructor(private service: JobService) {}

  async create(dto: CreateJobDto): Promise<CreateJobResponse> {
    const job = await this.service.create(dto)
    return { id: job.id }
  }

  async find(): Promise<FindJobsResponse> {
    return this.service.find()
  }
}
