import { createConnection } from 'typeorm'

import ormconfig from './src/db/ormconfig'
import app from './src/app'
import config from './config'
import { logger } from './src/utilities'

const catchError = (error: unknown) => {
    logger(error)
    process.exit(1)
}

const startup = async () => {
    await createConnection(ormconfig).catch(catchError)
    await app.listen(config.expressPort, '0.0.0.0', () => {
        console.log(`App listening at http://0.0.0.0:${config.expressPort}`) // eslint-disable-line
    })
}

startup()
