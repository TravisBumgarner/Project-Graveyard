const express = require('express')
const bodyParser = require('body-parser')
var elasticsearch = require('elasticsearch')

var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
})
const app = express()

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE") // DELETE Shouldn't be here and auth should be required.
  next()
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({'extended':'true'}))
app.use(bodyParser.json({type:'application/vnd.api+json'}))

const port = process.env.PORT || 8000

app.get('/ok', (req, res, next) => {
  client.cluster.health({},function(err,resp,status) {  
    res.json({resp})
  })
})

app.get('/indices', (req, resNode, next) => {
  client.cat.indices({format: 'json'}, function(err,resElastic,status) {  
    resNode.send(resElastic)
  })
})

app.get('/indices/delete', (req, resNode, next) => {
  client.indices.delete({index: req.query.index}, function(err,resElastic,status) {  
    resNode.send(resElastic)
  })
})

app.get('/indices/create', (req, resNode, next) => {
  client.indices.create({index: req.query.index}, function(err,resElastic,status) {  
    resNode.send(resElastic)
  })
})

app.listen(port, () => {
  console.log(`Running on port ${port}`)
})
