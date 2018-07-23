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

const searchAsYouType = () => {
    console.log('runs')
    elasticClient.search({
        index: 'terms',
        body: {
            query: {
                match_phrase_prefix: {
                    title: {
                        query: 'Boston',
                        slop: 10
                    }
                }
            }
        }
    }, (err, resp) => {
        console.log(resp)
    })
}

bulkIndex()