import { JobStatus } from './job.status'

export type Job = {
  id: string
  description: string
  suggestion: string
  status: JobStatus
}
