const ElasticHelper = require('./elastic-helper')

const snippets = [
    {
      "snippetWho": "John",
      "snippetWhat": "foo bazz",
      "snippetWhere": "New York"
    },
    {
      "snippetWho": "John",
      "snippetWhat": "wuzz bazz",
      "snippetWhere": "Boston"
    },
    {
      "snippetWho": "Mary",
      "snippetWhat": "fuzz bazz",
      "snippetWhere": "Boston"
    },
    {
      "snippetWho": "Mary",
      "snippetWhat": "hello",
      "snippetWhere": "Las Vegas"
    },
    {
      "snippetWho": "Bob",
      "snippetWhat": "goodbye",
      "snippetWhere": "Portland"
    }
]

const body = {
    dynamic: "false", // Don't add values that weren't mapped
    properties: {
        who: {
            type: "keyword"
        },
        what: {
            type: "text"
        },
        where: {
            type: "keyword"
        }
    }
}

async function allTheThings () {
    const snippetElasticHelper = new ElasticHelper(index='snippets', type='snippet')
    await snippetElasticHelper.connect()
    await snippetElasticHelper.deleteIndex()
    await snippetElasticHelper.createIndex()
    await snippetElasticHelper.putMapping({body})
    await snippetElasticHelper.bulkAdd(snippets)
}

allTheThings()