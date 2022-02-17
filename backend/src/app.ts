import express from 'express';
import { graphqlHTTP } from 'express-graphql'
import cors from 'cors'
import schema from './schemas'

import { authenticateToken } from './middleware'
import { User } from './types'

type ModifiedExpressRequest = express.Request & { currentUser: User | null }

const app = express()

app.use(cors())
app.use(authenticateToken)

app.use(express.static('./public'))

app.use('/graphql', graphqlHTTP((req: ModifiedExpressRequest) => {
  return {
    schema: schema,
    graphiql: true,
    context: req.currentUser
  }
}))

app.get('/', (req: ModifiedExpressRequest, res: express.Response) => {
  res.send('pong!')
})


app.get('/authcheck', (req: ModifiedExpressRequest, res: express.Response) => {
  const auth = req.currentUser;
  if (auth) {
    return res.send('Hi, from within the auth');
  }
  return res.status(403).send('Not authorized')
})

export default app