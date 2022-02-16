import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList,
    GraphQLInt
} from 'graphql'
import { getConnection } from 'typeorm';

import { entity } from '../db'

const WorksheetType = new GraphQLObjectType({
    name: 'Worksheet',
    description: 'This represents a worksheet',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLString) },
        title: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        date: { type: GraphQLNonNull(GraphQLString) },
        knownLanguage: { type: GraphQLNonNull(GraphQLString) },
        newLanguage: { type: GraphQLNonNull(GraphQLString) }
    })
})

const WorksheetEntryType = new GraphQLObjectType({
    name: 'WorksheetEntry',
    description: 'This represents a worksheet entry',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLString) },
        knownLanguageText: { type: GraphQLNonNull(GraphQLString) },
        newLanguageText: { type: GraphQLNonNull(GraphQLString) },
        worksheetId: { type: GraphQLNonNull(GraphQLString) },
        audioUrl: { type: GraphQLNonNull(GraphQLString) },
    })
})

export { WorksheetType, WorksheetEntryType }