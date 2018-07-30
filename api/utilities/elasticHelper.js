import elasticClient from '../elasticClient'
import searchData from '../../data/StackOverflowTags.json'
// ES6-style module-loading may not function as expected
// Due to technical limitations ES6-style module-loading is not fully supported in a babel-node REPL.

class ElasticHelper {
    constructor(index){
        this.index = index
    }
    
    async createIndex() {
        try {
            await elasticClient.indices.delete({
                index: this.index,
            })
        } catch (e) {
            console.log(e);
        }
    }

    async createIndex() {
        try {
            await elasticClient.indices.create({
                index: this.index,
            })
        } catch (e) {
            console.log(e);
        }
    }
    
    async putMapping(params) {
        try {
            await elasticClient.indices.putMapping({
                index: this.index,
                ...params
            })
        } catch (e) {
            console.log(e);
        }
    }

    async closeIndex() {
        try {
            await elasticClient.indices.close({
                index: this.index,
            })
        } catch (e) {
            console.log(e);
        }
    }

    async closeIndex() {
        try {
            await elasticClient.indices.open({
                index: this.index,
            })
        } catch (e) {
            console.log(e);
        }
    }
}

const type = 'movie'
const body = {
    properties: {
        "position": {
            type: "integer"
        },
        "const": {
            type: "keyword"
        },
        "created": {
            type: "date"
        },
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
        "Release Date (month/day/year)": {
            type: "date"
        },
        "URL": {
            type: "keyword"
        }
    }
  }

const imdbElasticHelper = new ElasticHelper('imdb')
imdbElasticHelper.createIndex()
imdbElasticHelper.putMapping({type, body})

// imdbElasticHelper.createIndex()




export {
    // searchAsYouType,
    // bulkIndexNGrams,
    // createNGramsSetting,
    // createNGramsMapping,
    // createIndex,
    // bulkIndex,
    // deleteIndex,
    // closeIndex,
    // openIndex,
    // searchNGrams,
    ElasticHelper
}

