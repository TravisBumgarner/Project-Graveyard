import { createConnection } from 'typeorm'
import { apolloServer, httpServer } from './express'

import ormconfig from './postgres/ormconfig'

const bootstrap = async () => {
    await createConnection(ormconfig)
    apolloServer.listen().then(({ url }) => {
        console.log(`Apollo: ${url}`)  // eslint-disable-line
    })
    httpServer.listen(5001, () => console.log('HTTP Server: http://localhost:5001')) // eslint-disable-line
}

bootstrap()
