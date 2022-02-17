import { getConnection } from 'typeorm';
import {
    GraphQLList,
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull

} from 'graphql'

import { entity } from '../db'
import { WorksheetType, WorksheetEntryType } from './types';
import { shouldPermit } from './utilities'

const worksheet = {
    type: GraphQLList(WorksheetType),
    description: 'List of All Worksheets',
    args: {
    },
    resolve: async (_1, _2, context) => {
        if (!shouldPermit(context)) return null

        const data = await getConnection()
            .getRepository(entity.Worksheet)
            .createQueryBuilder('worksheet')
            .getMany()
        return data
    }
}

const worksheetEntries = {
    type: GraphQLList(WorksheetEntryType),
    description: 'List of All Worksheet Entries',
    args: {
    },
    resolve: async (_1, _2, context) => {
        if (!shouldPermit(context)) return null

        const data = await getConnection()
            .getRepository(entity.WorksheetEntry)
            .createQueryBuilder('worksheet-entries')
            .getMany()
        return data
    }
}

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        worksheet,
        worksheetEntries
    })
})

export default RootQueryType