import elasticClient from '../elasticClient'
import searchData from '../../data/imdb.json'

// ES6-style module-loading may not function as expected
// Due to technical limitations ES6-style module-loading is not fully supported in a babel-node REPL.

class ElasticHelper {
    constructor(index, type){
        this.type = type
        this.index = index
    }
    
    createIndex() {
        return elasticClient.indices.create({
            index: this.index,
        })
    }

    putMapping(params) {
        return elasticClient.indices.putMapping({
            index: this.index,
            type: this.type,
            ...params
        })
    }
    
    deleteIndex() {
        return elasticClient.indices.delete({
            index: this.index,
        })
    }
    
    openIndex() {
        return elasticClient.indices.open({
            index: this.index,
        })
    }
    
    closeIndex() {
        return elasticClient.indices.close({
            index: this.index,
        })
    }


    bulkAdd(documents) {
        const body = []
        const header = {
            'index' : {
                '_index': this.index,
                '_type': this.type,
            } 
        }
        documents.map(doc => body.push(header, doc))

            elasticClient.bulk({body})     
    }

}
const index = 'imdb'
const type = 'movie'
const body = {
    dynamic: "false", // Don't add values that weren't mapped
    properties: {
        "position": {
            type: "integer"
        },
        "const": {
            type: "keyword"
        },
        // "created": {
        //     type: "date"
        // },
        "Title": {
            type: "keyword"
        },
        "Title type": {
            type: "keyword"
        },
        "Directors": {
            type: "keyword"
        },
        "You rated": {
            type: "float"
        },
        "IMDb Rating": {
            type: "float"
        },
        "Runtime (mins)": {
            type: "integer"
        },
        "Year": {
            type: "integer"
        },
        "Genres": {
            type: "text"
        },
        "Num Votes": {
            type: "integer"
        },
        "URL": {
            type: "keyword"
        }
    }
  }

async function doAllTheThings () {
    const imdbElasticHelper = new ElasticHelper(index, type)
    await imdbElasticHelper.deleteIndex()
    await imdbElasticHelper.createIndex()
    await imdbElasticHelper.putMapping({body})

    await imdbElasticHelper.bulkAdd(searchData)
}

doAllTheThings()

export {
    ElasticHelper
}

