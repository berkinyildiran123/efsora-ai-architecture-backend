import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs'

import { ConfigService } from '../config'

export class QueueAdapter {
  private readonly adapter: SQSClient

  constructor(private config: ConfigService) {
    this.adapter = new SQSClient({
      region: this.config.find('AWS_SQS_REGION'),
      endpoint: this.config.find('AWS_SQS_ENDPOINT'),
      credentials: {
        accessKeyId: this.config.find('AWS_SQS_ACCESS_KEY'),
        secretAccessKey: this.config.find('AWS_SQS_SECRET_ACCESS_KEY'),
      },
    })
  }

  async send(url: string, message: string): Promise<void> {
    const command = new SendMessageCommand({
      QueueUrl: url,
      MessageBody: message,
    })

    await this.adapter.send(command)
  }
}
