import { Knex } from 'knex'

import { JobStatus } from './job.status'

export async function createJobTable(database: Knex): Promise<void> {
  const exists = await database.schema.hasTable('jobs')
  if (exists) return

  await database.schema.createTable('jobs', (table) => {
    table.uuid('id').primary().defaultTo(database.fn.uuid())
    table.text('description').notNullable()
    table.text('suggestion')
    table.enum('status', Object.values(JobStatus), { useNative: true, enumName: 'job_status' }).defaultTo(JobStatus.Pending)
  })
}
