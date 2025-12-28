import { Exception } from './exception'

export class HttpException extends Exception {
  readonly status: number

  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}
