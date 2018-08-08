const express = require('express')
const bodyParser = require('body-parser')
const ElasticHelper = require('./elastic-helper')

const snippetsElasticHelper = new ElasticHelper(index='snippets', type='snippet')

const app = express()
app.use(bodyParser.json())

app.get(`/ok`, (request, response) => {
    return response.status(200).json({"status": "ok"});
})

app.post('/submit', async (request, response) => {
    const result = await snippetsElasticHelper.singleAdd(request.body)
    response.send(result, 200)
})

module.exports = app