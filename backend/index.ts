import { createConnection } from 'typeorm'

import ormconfig from './src/db/ormconfig'
import app from './src/app'

const catchError = (error: unknown) => {
  console.log(error)
  process.exit(1)
}

const startup = async () => {
  await createConnection(ormconfig).catch(catchError)
  await app.listen(5001, () => {
    console.log(`App listening at http://localhost:5001`)
  })
}

startup()




