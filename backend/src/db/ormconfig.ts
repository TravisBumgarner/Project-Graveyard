import path from 'path'
import { ConnectionOptions } from 'typeorm'
import config from '../../config'

const ENTITIES_DIR = __dirname + '/entity'
const MIGRATIONS_DIR = __dirname + '/migration'

export default {
    development: {
        ...config.postgres,
        type: 'postgres',
        synchronize: false,
        logging: false,
        entities: [ENTITIES_DIR + '/**/*{.ts,.js}'],
        migrations: [MIGRATIONS_DIR + '/**/*{.ts,.js}'],
        cli: {
            entitiesDir: ENTITIES_DIR,
            migrationsDir: MIGRATIONS_DIR,
        },

    }
}[config.nodeEnv] as ConnectionOptions
