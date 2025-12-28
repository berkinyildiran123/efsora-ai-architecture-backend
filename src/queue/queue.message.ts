export type QueueMessageType = 'job_created'

export type QueueMessage = {
  type: QueueMessageType
  payload: Object
}
