import { ConnectionOptions } from 'typeorm'
import config from '../../config'

const ENTITIES_DIR = `${__dirname}/entity`
const MIGRATIONS_DIR = `${__dirname}/migration`

const ormconfig = {
    local: {
        database: config.postgres.database,
        password: config.postgres.password,
        username: config.postgres.username,
        port: config.postgres.port,
        type: 'postgres',
        synchronize: false,
        logging: false,
        host: config.postgres.host,
        entities: [`${ENTITIES_DIR}/**/*{.ts,.js}`],
        migrations: [`${MIGRATIONS_DIR}/**/*{.ts,.js}`],
        cli: {
            entitiesDir: ENTITIES_DIR,
            migrationsDir: MIGRATIONS_DIR,
        },
    },
    staging: {
        database: config.postgres.database,
        password: config.postgres.password,
        username: config.postgres.username,
        port: process.env.IS_RUNNING_MIGRATIONS ? 1234 : config.postgres.port,
        type: 'postgres',
        extra: process.env.IS_RUNNING_MIGRATIONS ? {} : {
            socketPath: config.postgres.host,
        },
        synchronize: false,
        logging: false,
        host: config.postgres.host,
        entities: [`${ENTITIES_DIR}/**/*{.ts,.js}`],
        migrations: [`${MIGRATIONS_DIR}/**/*{.ts,.js}`],
        cli: {
            entitiesDir: ENTITIES_DIR,
            migrationsDir: MIGRATIONS_DIR,
        }
    },
    production: {
        database: config.postgres.database,
        password: config.postgres.password,
        username: config.postgres.username,
        port: process.env.IS_RUNNING_MIGRATIONS ? 1234 : config.postgres.port,
        type: 'postgres',
        extra: process.env.IS_RUNNING_MIGRATIONS ? {} : {
            socketPath: config.postgres.host,
        },
        synchronize: false,
        logging: false,
        host: process.env.IS_RUNNING_MIGRATIONS ? 'localhost' : config.postgres.host,
        entities: [`${ENTITIES_DIR}/**/*{.ts,.js}`],
        migrations: [`${MIGRATIONS_DIR}/**/*{.ts,.js}`],
        cli: {
            entitiesDir: ENTITIES_DIR,
            migrationsDir: MIGRATIONS_DIR,
        },
    },
}[process.env.NODE_ENV || 'production'] as ConnectionOptions

export default ormconfig
