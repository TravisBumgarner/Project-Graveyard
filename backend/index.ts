import { createConnection } from 'typeorm'

import ormconfig from './src/db/ormconfig'
import app from './src/app'
import config from './config'

const catchError = (error: unknown) => {
  console.log(error)
  process.exit(1)
}


const startup = async () => {
  await createConnection(ormconfig).catch(catchError)
  await app.listen(config.expressPort, '0.0.0.0', () => {
    console.log(`App listening at http://0.0.0.0:${config.expressPort}`)
  })
}

startup()




