import knex, { Knex } from 'knex'

import { ConfigService } from './config'

export function createDatabase(configService: ConfigService): Knex {
  return knex({
    client: 'pg',
    connection: {
      host: configService.find('DATABASE_HOST'),
      port: configService.find('DATABASE_PORT'),
      user: configService.find('DATABASE_USER'),
      password: configService.find('DATABASE_PASSWORD'),
      database: configService.find('DATABASE_NAME'),
      ssl: {
        rejectUnauthorized: false,
      },
    },
  })
}
