import path from 'path'
import { ConnectionOptions } from 'typeorm'
import config from '../../config'

const ENTITIES_DIR = __dirname + '/entity'
const MIGRATIONS_DIR = __dirname + '/migration'

const ormconfig = {
    'development': {
        database: config.postgres.database,
        password: config.postgres.password,
        username: config.postgres.username,
        type: 'postgres',
        synchronize: false,
        logging: false,
        host: config.postgres.host,
        entities: [ENTITIES_DIR + '/**/*{.ts,.js}'],
        migrations: [MIGRATIONS_DIR + '/**/*{.ts,.js}'],
        cli: {
            entitiesDir: ENTITIES_DIR,
            migrationsDir: MIGRATIONS_DIR,
        },
    },
    'production': {
        database: config.postgres.database,
        password: config.postgres.password,
        username: config.postgres.username,
        type: 'postgres',
        extra: {
            socketPath: config.postgres.host,
        },
        synchronize: false,
        logging: false,
        host: config.postgres.host,
        entities: [ENTITIES_DIR + '/**/*{.ts,.js}'],
        migrations: [MIGRATIONS_DIR + '/**/*{.ts,.js}'],
        cli: {
            entitiesDir: ENTITIES_DIR,
            migrationsDir: MIGRATIONS_DIR,
        },
    }
}[process.env.NODE_ENV || ''] as ConnectionOptions


export default ormconfig