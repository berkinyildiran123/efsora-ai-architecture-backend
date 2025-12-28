import { Knex } from 'knex'

import { Job } from './job'

import { CreateJobDto } from './dto/create-job.dto'

export class JobRepository {
  constructor(private database: Knex) {}

  async create(dto: CreateJobDto): Promise<Job> {
    const result = await this.database.insert(dto).into('jobs').returning('*')
    return result[0]
  }

  async find(): Promise<Job[]> {
    return this.database.select('*').from('jobs')
  }
}
