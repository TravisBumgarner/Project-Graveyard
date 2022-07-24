import express from 'express'
import cors from 'cors'
import { graphqlHTTP } from 'express-graphql'
import bodyParser from 'body-parser'

import { schema } from './graphql'

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.use('/graphql', graphqlHTTP((req: Express.Request) => ({
    schema,
    graphiql: process.env.NODE_ENV !== 'production'
})))


app.get('/ping', async (req: express.Request, res: express.Response) => {
    res.send('pong!')
})

export default app
