const express = require('express')
const bodyParser = require('body-parser')


const app = express()

app.use(bodyParser.json())

app.get(`/ok`, (request, response) => {
    return response.status(200).json({"status": "ok"});
})

app.post('/submit', (request, response) => {
    const formData = request.body
    response.send(formData, 200)
})

module.exports = app