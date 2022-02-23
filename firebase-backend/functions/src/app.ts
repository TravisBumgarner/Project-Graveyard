import express from 'express'
import cors from 'cors'
import { ConnectionOptions, createConnection } from "typeorm";

const ENTITIES_DIR = __dirname + '/entity'
const MIGRATIONS_DIR = __dirname + '/migration'

import config from './config'

const ormconfig = {
    ...config().postgres,
    type: 'postgres',
    synchronize: false,
    logging: false,
    entities: [ENTITIES_DIR + '/**/*{.ts,.js}'],
    migrations: [MIGRATIONS_DIR + '/**/*{.ts,.js}'],
    cli: {
        entitiesDir: ENTITIES_DIR,
        migrationsDir: MIGRATIONS_DIR,
    },
} as ConnectionOptions

const app = express();

app.use(cors({ origin: true }));

app.get('/ping', (req: express.Request, res: express.Response) => res.send(JSON.stringify(process.env.NODE_ENV)));

app.get('/db', async (req: express.Request, res: express.Response) => {
    try {
        const connection = await createConnection(ormconfig)
        const name = connection.name
        await connection.close()
        return res.send(name)
    } catch (error) {
        return JSON.stringify(error)
    }
})

export default app