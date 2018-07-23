import elasticClient from '../elasticClient'
import searchData from '../../data/StackOverflowTags.json'
// ES6-style module-loading may not function as expected
// Due to technical limitations ES6-style module-loading is not fully supported in a babel-node REPL.


const bulkIndex = () => {
    // Index Header has to go with every term being added for bulkIndex
    const body = []
    const indexHeader = {
        'index' : {
            '_index' : 'terms',
            '_type' : '_doc',
        } 
    }
    searchData.map(indexTerm => body.push(indexHeader, indexTerm))
    
    elasticClient.bulk({body}, (err, resp) => {
        console.log(err, resp)
    })
}

const searchAsYouType = (query, slop) => {
    elasticClient.search({
        index: 'terms',
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
        return terms
    })
}

export {
    searchAsYouType,
}