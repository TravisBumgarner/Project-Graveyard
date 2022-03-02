import express from 'express';
import { graphqlHTTP } from 'express-graphql'
import cors from 'cors'
import bodyParser from 'body-parser'
import { v4 as uuidv4 } from 'uuid'

import schema from './schemas'

import { authenticateToken } from './middleware'
import { getConnection } from 'typeorm';
import { entity } from './db';
import uploadFile from './services/cloudinary'

type ModifiedExpressRequest = express.Request & { authenticatedUserId: string | null, firebaseId: string }

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(authenticateToken)

app.use(express.static('./public'))

app.use('/graphql', graphqlHTTP((req: ModifiedExpressRequest) => {
  return {
    schema: schema,
    graphiql: true,
    context: { authenticatedUserId: req.authenticatedUserId }
  }
}))

app.get('/', async (req: ModifiedExpressRequest, res: express.Response) => {
  await uploadFile()
  res.send('pong!')
})

app.get('/whoami', async (req: ModifiedExpressRequest, res: express.Response) => {
  if (req.firebaseId) {
    const data = await getConnection()
      .getRepository(entity.User)
      .createQueryBuilder('user')
      .where('user.firebaseId = :firebaseId', { firebaseId: req.firebaseId })
      .getOne()

    return res.send(data);
  }
  return res.status(403).send('Not authorized')


})

app.post('/whoami', async (req: ModifiedExpressRequest, res: express.Response) => {
  const auth = req.firebaseId;
  if (auth) {
    const response = await getConnection()
      .getRepository(entity.User)
      .save({
        id: uuidv4(),
        username: req.body.username,
        firebaseId: req.firebaseId
      })
    return res.send(response);
  }
  return res.status(403).send('Not authorized')
})


app.get('/authcheck', (req: ModifiedExpressRequest, res: express.Response) => {
  if (req.firebaseId) {
    return res.send('Hi, from within the auth');
  }
  return res.status(403).send('Not authorized')
})

export default app