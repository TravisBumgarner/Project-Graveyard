import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
} from 'graphql'
import { getConnection } from 'typeorm'

import { entity } from '../db'

const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'This represents a user',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLString) },
        username: { type: new GraphQLNonNull(GraphQLString) },
    }),
})

const WorksheetType = new GraphQLObjectType({
    name: 'Worksheet',
    description: 'This represents a worksheet',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLString) },
        userId: { type: new GraphQLNonNull(GraphQLString) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        date: { type: new GraphQLNonNull(GraphQLString) },
        knownLanguage: { type: new GraphQLNonNull(GraphQLString) },
        newLanguage: { type: new GraphQLNonNull(GraphQLString) },
        status: { type: new GraphQLNonNull(GraphQLString) },
        user: {
            type: UserType,
            resolve: async (worksheet: any) => {
                const data = await getConnection()
                    .getRepository(entity.User)
                    .createQueryBuilder('user')
                    .where({ id: worksheet.userId })
                    .getOne()
                return data
            },
        },
    }),
})

const ReviewType = new GraphQLObjectType({
    name: 'Review',
    description: 'This represents a review',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLString) },
        userId: { type: new GraphQLNonNull(GraphQLString) },
        worksheetId: { type: new GraphQLNonNull(GraphQLString) },
        date: { type: new GraphQLNonNull(GraphQLString) },
    }),
})

const ReviewForStudentType = new GraphQLObjectType({
    name: 'ReviewForStudentType',
    description: 'This represents a review to be given back to the student',
    fields: () => ({
        knownLanguageText: { type: new GraphQLNonNull(GraphQLString) },
        newLanguageText: { type: new GraphQLNonNull(GraphQLString) },
        audioUrl: { type: new GraphQLNonNull(GraphQLString) },
        writtenFeedback: { type: new GraphQLNonNull(GraphQLString) },
        oralFeedback: { type: new GraphQLNonNull(GraphQLString) },
        reviewEntryId: { type: new GraphQLNonNull(GraphQLString) },

    }),
})

const ReviewEntryType = new GraphQLObjectType({
    name: 'Review Entry',
    description: 'This represents a review entry',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLString) },
        reviewId: { type: new GraphQLNonNull(GraphQLString) },
        worksheetEntryId: { type: new GraphQLNonNull(GraphQLString) },
        oralFeedback: { type: new GraphQLNonNull(GraphQLString) },
        writtenFeedback: { type: new GraphQLNonNull(GraphQLString) },
    }),
})

const WorksheetEntryType = new GraphQLObjectType({
    name: 'WorksheetEntry',
    description: 'This represents a worksheet entry',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLString) },
        knownLanguageText: { type: new GraphQLNonNull(GraphQLString) },
        newLanguageText: { type: new GraphQLNonNull(GraphQLString) },
        worksheetId: { type: new GraphQLNonNull(GraphQLString) },
        audioUrl: { type: new GraphQLNonNull(GraphQLString) },
    }),
})

export {
    WorksheetType, WorksheetEntryType, ReviewType, ReviewEntryType, ReviewForStudentType,
}
