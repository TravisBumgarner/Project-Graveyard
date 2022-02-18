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
        userId: { type: GraphQLNonNull(GraphQLString) },
        title: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        date: { type: GraphQLNonNull(GraphQLString) },
        knownLanguage: { type: GraphQLNonNull(GraphQLString) },
        newLanguage: { type: GraphQLNonNull(GraphQLString) }
        // user: {
        //     type: UserType,
        //     resolve: async (worksheet: any) => {
        //         const data = await getConnection()
        //             .getRepository(entity.User)
        //             .createQueryBuilder('user')
        //             .where({ id: worksheet.userId })
        //             .getOne()
        //         return data
        //     }
        // },
    })
})

const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'This represents a user',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLString) },
        username: { type: GraphQLNonNull(GraphQLString) },
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