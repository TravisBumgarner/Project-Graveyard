import express from 'express';
import cors from 'cors'
import { createServer } from 'http';
import { ApolloServer } from 'apollo-server'

import { schema } from '../graphql'

const app = express()
app.use(cors({ origin: '*' }))

app.get('/', async (req: express.Request, res: express.Response) => {
  res.send('pong!')
})

const httpServer = createServer(app);

const apolloServer = new ApolloServer({
  schema,
});

export {
  apolloServer,
  httpServer
}

