import * as express from 'express'
import * as cors from 'cors'
import { ConnectionOptions, createConnection } from "typeorm";

const ENTITIES_DIR = __dirname + '/entity'
const MIGRATIONS_DIR = __dirname + '/migration'

const ormconfig = {
    host: '',
    port: 5432,
    username: '',
    password: '',
    database: 'postgres',
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

app.get('/ping', (req: express.Request, res: express.Response) => res.send());

app.get('/db', async (req: express.Request, res: express.Response) => {
    const connection = await createConnection(ormconfig)
    const name = connection.name
    return res.send(name)
})

app.listen(5001, () => console.log('running'))

if (!(require.main === module)) {
    const functions = require("firebase-functions");
    exports.api = functions.https.onRequest(app);
}