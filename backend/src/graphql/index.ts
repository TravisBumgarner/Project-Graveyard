import { makeExecutableSchema } from '@graphql-tools/schema'

import { mutationTypeDefs, mutationResolvers } from './mutations'
import { queryTypeDefs, queryResolvers, Metric } from './queries'
import { sharedTypeDefs } from './sharedTypes'

const resolvers = {
    Query: queryResolvers,
    Metric,
    Mutation: mutationResolvers,
}

const schema = makeExecutableSchema({
    typeDefs: [mutationTypeDefs, queryTypeDefs, sharedTypeDefs],
    resolvers
})

export {
    schema
}
