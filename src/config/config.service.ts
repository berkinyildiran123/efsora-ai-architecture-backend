import { Config } from './config'

export class ConfigService {
  constructor(private config: Config) {}

  find<T extends keyof Config>(key: T): Config[T] {
    return this.config[key]
  }
}
