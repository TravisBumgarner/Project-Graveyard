import { getConnection } from 'typeorm';
import {
    GraphQLList,
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLBoolean

} from 'graphql'

import { entity } from '../db'
import { WorksheetType, WorksheetEntryType } from './types';
import { Context } from '../types';

type GetWorksheetArgs = {
    userId?: string
    filterAuthenticatedUser?: boolean
}

const worksheet = {
    type: GraphQLList(WorksheetType),
    description: 'List of Worksheets',
    args: {
        userId: { type: GraphQLString },
        filterAuthenticatedUser: { type: GraphQLBoolean }
    },
    resolve: async (_parent, args: GetWorksheetArgs, context: Context) => {
        if (!context.authenticatedUserId) return null
        const query = await getConnection()
            .getRepository(entity.Worksheet)
            .createQueryBuilder('worksheet')

        if (args.userId) query.andWhere("worksheet.userId = :userId", { userId: args.userId })

        if (args.filterAuthenticatedUser) query.andWhere("worksheet.userId != :userId", { userId: context.authenticatedUserId })

        const data = query.getMany()

        return data
    }
}

const whoami = {
    type: GraphQLList(WorksheetType),
    description: 'Find out who you are!',
    args: {},
    resolve: async (_parent, _args, context: Context) => {
        if (!context.authenticatedUserId) return null
        const data = await getConnection()
            .getRepository(entity.User)
            .createQueryBuilder('user')
            .where('user.id = :authenticatedUserId', { authenticatedUserId: context.authenticatedUserId })
            .getOne()

        return data
    }
}

const worksheetEntries = {
    type: GraphQLList(WorksheetEntryType),
    description: 'List of All Worksheet Entries',
    args: {
    },
    resolve: async (_parent, args, context: Context) => {
        if (!context.authenticatedUserId) return null

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