import { getConnection } from 'typeorm'
import {
    GraphQLList,
    GraphQLObjectType,
    GraphQLString,

} from 'graphql'

import { entity } from '../db'
import { WorksheetType, WorksheetEntryType, ReviewForStudentType } from './types'
import { Context } from '../types'
import { isUUID } from '../utilities'

type GetWorksheetArgs = {
    worksheetId?: string
}

const worksheet = {
    type: new GraphQLList(WorksheetType),
    description: 'List of Worksheets',
    args: {
        worksheetId: { type: GraphQLString },
    },
    resolve: async (_parent, args: GetWorksheetArgs, context: Context) => {
        if (!context.authenticatedUserId) return []
        const query = await getConnection()
            .getRepository(entity.Worksheet)
            .createQueryBuilder('worksheet')

        if (args.worksheetId) {
            query.andWhere('worksheet.id = :worksheetId', { worksheetId: args.worksheetId })
        }
        const data = query.getMany()
        return data
    },
}

type GetReviewArgs = {
    worksheetId: string
}

const studentReview = {
    type: new GraphQLList(ReviewForStudentType),
    description: 'List of Reviews for a student',
    args: {
        worksheetId: { type: GraphQLString },
    },
    resolve: async (_parent, args: GetReviewArgs, context: Context) => {
        if (!context.authenticatedUserId) return []
        if (!isUUID(args.worksheetId)) return []

        const data = await getConnection()
            .query(`
            select
                worksheet_entry."knownLanguageText",
                worksheet_entry."newLanguageText",
                worksheet_entry."audioUrl",
                review_entry."oralFeedback",
                review_entry."writtenFeedback",
                "review_entry".id as "reviewEntryId"
            from
                worksheet_entry
            join
                review_entry on  review_entry."worksheetEntryId" = worksheet_entry.id
            where
                worksheet_entry."worksheetId" = '${args.worksheetId}'
            ;
            `)

        return data
    },
}

type GetWorksheetEntryArgs = {
    worksheetId?: string
}

const worksheetEntries = {
    type: new GraphQLList(WorksheetEntryType),
    description: 'List of All Worksheet Entries',
    args: {
        worksheetId: { type: GraphQLString },
    },
    resolve: async (_parent, args: GetWorksheetEntryArgs, context: Context) => {
        if (!context.authenticatedUserId) return []

        const query = await getConnection()
            .getRepository(entity.WorksheetEntry)
            .createQueryBuilder('worksheet-entries')

        if (args.worksheetId) {
            query.andWhere('worksheet-entries.worksheetId = :worksheetId', { worksheetId: args.worksheetId })
        }

        const data = await query.getMany()
        return data
    },
}

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        worksheet,
        worksheetEntries,
        studentReview,
    }),
})

export default RootQueryType
