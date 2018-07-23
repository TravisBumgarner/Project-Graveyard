import * as esUtils from './elasticBackfill'

// Not sure why these can't be all run at the same time. Might have fixed this. Will return later... or will I
const setupNGrams = async () => {
    // await esUtils.deleteNGramsIndex()
    // await esUtils.createNGramsIndex()
    // await esUtils.closeNGramsIndex()
    // await esUtils.createNGramsSetting()
    // await esUtils.openNGramsIndex()
    await esUtils.createNGramsMapping()
    await console.log('done')
}
setupNGrams()