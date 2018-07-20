const express = require('express');
const bodyParser = require('body-parser')

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE"); // DELETE Shouldn't be here and auth should be required.
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json({type:'application/vnd.api+json'}));

const port = process.env.PORT || 8000;

app.get('/', (req, res, next) => {
    res.json({
        "msg": "ok"
    })
});


app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
