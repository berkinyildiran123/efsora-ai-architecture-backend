import { Exception } from './exception'

export class AppException extends Exception {
  constructor(message: string) {
    super(message)
  }
}
