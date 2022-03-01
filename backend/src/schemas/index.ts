import {
    GraphQLSchema,
} from 'graphql'

import RootMutationType from './mutations'
import RootQueryType from './queries'
import { ReviewEntryType } from './types'

const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType
})

export default schema