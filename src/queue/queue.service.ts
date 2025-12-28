import { ConfigService } from '../config'

import { QueueAdapter } from './queue.adapter'
import { QueueMessage, QueueMessageType } from './queue.message'

export class QueueService {
  constructor(
    private adapter: QueueAdapter,
    private config: ConfigService,
  ) {}

  private determineUrl(type: QueueMessageType): string {
    switch (type) {
      case 'job_created':
        return this.config.find('JOB_QUEUE_URL')
    }
  }

  send(message: QueueMessage): void {
    const url = this.determineUrl(message.type)
    this.adapter.send(url, JSON.stringify(message))
  }
}
