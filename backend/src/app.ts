import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import cors from 'cors'
import bodyParser from 'body-parser'
import { v4 as uuidv4 } from 'uuid'
import * as Sentry from '@sentry/node'
import * as Tracing from '@sentry/tracing'
import { getConnection } from 'typeorm'

import schema from './schemas'
import { authenticateToken } from './middleware'
import { entity } from './db'

type ModifiedExpressRequest = express.Request & { authenticatedUserId: string | null, firebaseId: string }

const app = express()

Sentry.init({
    dsn: 'https://9381cae1fb3848a7a4d9b5309c2ae7b8@o196886.ingest.sentry.io/6244260',
    integrations: [
        new Sentry.Integrations.Http({ tracing: true }),
        new Tracing.Integrations.Express({ app }),
    ],
    tracesSampleRate: 1.0,
})

app.use(Sentry.Handlers.requestHandler())
app.use(Sentry.Handlers.tracingHandler())

app.use(cors())
app.use(bodyParser.json())
app.use(authenticateToken)

app.use('/graphql', graphqlHTTP((req: ModifiedExpressRequest) => ({
    schema,
    graphiql: true,
    context: { authenticatedUserId: req.authenticatedUserId },
})))

app.get('/', async (req: ModifiedExpressRequest, res: express.Response) => {
    res.send('pong!')
})

app.get('/whoami', async (req: ModifiedExpressRequest, res: express.Response) => {
    if (req.firebaseId) {
        const data = await getConnection()
            .getRepository(entity.User)
            .createQueryBuilder('user')
            .where('user.firebaseId = :firebaseId', { firebaseId: req.firebaseId })
            .getOne()

        return res.send(data)
    }
    return res.status(403).send('Not authorized')
})

app.post('/whoami', async (req: ModifiedExpressRequest, res: express.Response) => {
    const auth = req.firebaseId
    if (auth) {
        const response = await getConnection()
            .getRepository(entity.User)
            .save({
                id: uuidv4(),
                username: req.body.username,
                firebaseId: req.firebaseId,
            })
        return res.send(response)
    }
    return res.status(403).send('Not authorized')
})

app.get('/authcheck', (req: ModifiedExpressRequest, res: express.Response) => {
    if (req.firebaseId) {
        return res.send('Hi, from within the auth')
    }
    return res.status(403).send('Not authorized')
})

app.use(Sentry.Handlers.errorHandler())
app.use((err, req: ModifiedExpressRequest, res: express.Response) => {
    res.statusCode = 500
})

export default app
