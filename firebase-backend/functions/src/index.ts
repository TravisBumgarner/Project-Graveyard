import * as functions from "firebase-functions";
import * as express from 'express'
import * as cors from 'cors'

const app = express();

app.use(cors({ origin: true }));

app.get('/ping', (req: express.Request, res: express.Response) => res.send('Hi'));

exports.api = functions.https.onRequest(app);