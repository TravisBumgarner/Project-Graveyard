import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList,
    GraphQLInt,
    GraphQLEnumType
} from 'graphql'
import { getConnection } from 'typeorm';

import { entity } from '../db'
import { WorksheetStatus } from '../types';

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
        newLanguage: { type: GraphQLNonNull(GraphQLString) },
        status: { type: GraphQLNonNull(GraphQLString) },
        user: {
            type: UserType,
            resolve: async (worksheet: any) => {
                const data = await getConnection()
                    .getRepository(entity.User)
                    .createQueryBuilder('user')
                    .where({ id: worksheet.userId })
                    .getOne()
                return data
            }
        },
    })
})

const ReviewType = new GraphQLObjectType({
    name: 'Review',
    description: 'This represents a review',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLString) },
        userId: { type: GraphQLNonNull(GraphQLString) },
        worksheetId: { type: GraphQLNonNull(GraphQLString) },
        date: { type: GraphQLNonNull(GraphQLString) },
    })
})

const ReviewForStudentType = new GraphQLObjectType({
    name: 'ReviewForStudentType',
    description: 'This represents a review to be given back to the student',
    fields: () => ({
        knownLanguageText: { type: GraphQLNonNull(GraphQLString) },
        newLanguageText: { type: GraphQLNonNull(GraphQLString) },
        audioUrl: { type: GraphQLNonNull(GraphQLString) },
        writtenFeedback: { type: GraphQLNonNull(GraphQLString) },
        oralFeedback: { type: GraphQLNonNull(GraphQLString) },
    })
})

const ReviewEntryType = new GraphQLObjectType({
    name: 'Review Entry',
    description: 'This represents a review entry',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLString) },
        reviewId: { type: GraphQLNonNull(GraphQLString) },
        worksheetEntryId: { type: GraphQLNonNull(GraphQLString) },
        oralFeedback: { type: GraphQLNonNull(GraphQLString) },
        writtenFeedback: { type: GraphQLNonNull(GraphQLString) },
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

export { WorksheetType, WorksheetEntryType, ReviewType, ReviewEntryType, ReviewForStudentType }