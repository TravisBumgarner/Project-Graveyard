import express from 'express';
import { graphqlHTTP } from 'express-graphql'
import cors from 'cors'
import schema from './schemas'

const app = express()

app.use(cors())

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}))

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('pong!')
})

export default app