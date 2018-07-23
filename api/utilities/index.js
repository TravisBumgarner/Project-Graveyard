import * as esUtils from './elasticBackfill'


// esUtils.deleteIndex("terms_n_grams")
// esUtils.createIndex("terms_n_grams")
// esUtils.closeIndex("terms_n_grams")
// esUtils.createNGramsSetting()
// esUtils.openIndex("terms_n_grams")
// esUtils.createNGramsMapping()
// esUtils.bulkIndexNGrams()
// console.log('done')

// esUtils.createIndex("terms_search_as_you_type")
esUtils.bulkIndexSearchAsYouType()