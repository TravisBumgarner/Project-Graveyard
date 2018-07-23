const elasticClient = require('../elasticClient')
// ES6-style module-loading may not function as expected
// Due to technical limitations ES6-style module-loading is not fully supported in a babel-node REPL.
const createTermEntry = () => {

}

elasticClient.bulk({
    body: [
        {
            "create" : {
                "_index" : "term",
                "_type" : "_doc",
                "fields": "{'foo': 'ff'}"
            } 
        }
    ]
  }, function (err, resp) {
    console.log(resp)
  });

