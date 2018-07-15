const express = require('express')

const app = express()

app.get(`/ok`, (req, res) => {
    return res.status(200).json({"status": "ok"});
})

module.exports = app