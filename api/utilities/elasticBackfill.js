import elasticClient from '../elasticClient'
import searchData from '../../data/StackOverflowTags.json'
// ES6-style module-loading may not function as expected
// Due to technical limitations ES6-style module-loading is not fully supported in a babel-node REPL.


const bulkIndexSearchAsYouType = () => {
    // Index Header has to go with every term being added for bulkIndex
    const body = []
    const indexHeader = {
        'index' : {
            '_index' : 'terms_search_as_you_type',
            '_type' : '_doc',
        } 
    }
    searchData.map(indexTerm => body.push(indexHeader, indexTerm))
    
    elasticClient.bulk({body}, (err, resp) => {
        console.log(err, resp)
    })
}

const deleteIndex = (index) => {
    elasticClient.indices.delete({
        index
    }, (err,res) => {  
        console.log(err, res)
    })
}

const createIndex = (index) => {
    elasticClient.indices.create({
        index
    }, (err,res) => {  
        console.log(err, res)
    })
}

const closeIndex = (index) => {
    elasticClient.indices.close({
        index
    })
}

const openIndex = (index) => {
    elasticClient.indices.open({
        index
    })
}

const createNGramsMapping = () => {
    elasticClient.indices.putMapping({
        index: "terms_n_grams",
        type: "term",
        body: {
            properties: {
                source: {
                    type: "keyword"
                },
                target: {
                    type: "text",
                    analyzer: "autocomplete"
                },
                ranking: {
                    type: 'float'
                }
            }
        }
    }, (err, resp) => {
        console.log(err, resp)
    })
}

const createNGramsSetting = () => {
    elasticClient.indices.putSettings({
        index: "terms_n_grams",
        body: {
            settings: {
                analysis: {
                    filter: {
                        autocomplete_filter: {
                            type: "edge_ngram",
                            min_gram: 1,
                            max_gram: 20
                        }
                    },
                    analyzer:
                    {
                        autocomplete: {
                            type: "custom",
                            tokenizer: "standard",
                            filter: [
                                "lowercase",
                                "autocomplete_filter"
                            ]
                        }
                    }
                }
            }
        }
    }, (err, resp) => {
        console.log(err, resp)
    })
}

const bulkIndexNGrams = () => {
    // Index Header has to go with every term being added for bulkIndex
    const body = []
    const indexHeader = {
        'index' : {
            '_index' : 'terms_n_grams',
            '_type' : 'term',
        } 
    }

    // const searchDataSubset = searchData.slice(0,10)
    searchData.map(indexTerm => body.push(indexHeader, indexTerm))
    
    elasticClient.bulk({body}, (err, resp) => {
        console.log(err, resp)
    })
}

const searchAsYouType = (query, slop, callback) => {
    elasticClient.search({
        index: 'terms_search_as_you_type',
        body: {
            query: {
                match_phrase_prefix: {
                    source: {
                        query,
                        slop
                    }
                }
            }
        }
    }, (err, resp) => {
        const terms = resp.hits.hits.map(hit => hit._source.target)
        console.log(terms)
        callback(terms)
    })
}

const searchNGrams = (query, callback) => {
    elasticClient.search({
        index: 'terms_n_grams',
        body: {
            query: {
                match: {
                    target: {
                        query,
                        analyzer: "standard"
                    }
                }
            }
        }
    }, (err, resp) => {
        const terms = resp.hits.hits.map(hit => hit._source.target)
        console.log(terms)
        callback(terms)
    })
}


export {
    searchAsYouType,
    bulkIndexNGrams,
    createNGramsSetting,
    createNGramsMapping,
    createIndex,
    bulkIndexSearchAsYouType,
    deleteIndex,
    closeIndex,
    openIndex,
    searchNGrams,
}