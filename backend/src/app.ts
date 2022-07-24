import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

const app = express()

app.use(cors())
app.use(bodyParser.json())


app.get('/ping', async (req: express.Request, res: express.Response) => {
    res.send('pong!')
})

export default app
