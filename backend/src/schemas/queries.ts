import { getConnection, getRepository } from 'typeorm'
import {
    GraphQLList,
    GraphQLObjectType,
    GraphQLString,

} from 'graphql'

import { entity } from '../db'
import {
    WorksheetType, WorksheetEntryType,
    ReviewForStudentType,
    UserType, ReviewType, ReviewEntryType
} from './types'
import { TContext } from '../types'
import { isUUID } from '../utilities'

type GetUserArgs = {
    userId?: string
}

const user = {
    type: new GraphQLList(UserType),
    description: 'List of Users',
    args: {
        userId: { type: GraphQLString },
    },
    resolve: async (_parent, args: GetUserArgs, context: TContext) => {
        if (!context.authenticatedUserId) return []
        const query = await getConnection()
            .getRepository(entity.User)
            .createQueryBuilder('user')

        if (args.userId) {
            query.andWhere('user.id = :userId', { userId: args.userId })
        }
        const data = query.getMany()
        return data
    },
}

const reviewer = {
    type: new GraphQLList(UserType),
    description: 'List of Reviewers',
    args: {
    },
    resolve: async (_parent, args: null, context: TContext) => {
        if (!context.authenticatedUserId) return []

        const currentUser = await getConnection()
            .getRepository(entity.User)
            .createQueryBuilder('user')
            .andWhere('user.id = :userId', { userId: context.authenticatedUserId })
            .getOne()

        const reviewers = await getRepository(entity.User)
            .createQueryBuilder()
            .relation(entity.User, 'followers')
            .of(currentUser)
            .loadMany()

        return reviewers
    },
}

type GetWorksheetArgs = {
    worksheetId?: string
}

const worksheet = {
    type: new GraphQLList(WorksheetType),
    description: 'List of Worksheets',
    args: {
        worksheetId: { type: GraphQLString },
    },
    resolve: async (_parent, args: GetWorksheetArgs, context: TContext) => {
        if (!context.authenticatedUserId) return []
        const query = await getConnection()
            .getRepository(entity.Worksheet)
            .createQueryBuilder('worksheet')

        if (args.worksheetId) {
            query.andWhere('worksheet.id = :worksheetId', { worksheetId: args.worksheetId })
        }
        const data = await query.getMany()
        return data
    },
}

type ReviewArgs = {
    worksheetId?: string
    reviewerId?: string
}

const review = {
    type: new GraphQLList(ReviewType),
    description: 'List of Reviews',
    args: {
        worksheetId: { type: GraphQLString },
        reviewerId: { type: GraphQLString },
        status: { type: GraphQLString },
        id: { type: GraphQLString },
        date: { type: GraphQLString },
    },
    resolve: async (_parent, args: ReviewArgs, context: TContext) => {
        if (!context.authenticatedUserId) return []
        if (args.reviewerId && args.reviewerId !== context.authenticatedUserId) return [] // Don't let someone request other reviews

        const query = await getConnection()
            .getRepository(entity.Review)
            .createQueryBuilder('review')

        if (args.worksheetId) {
            query.andWhere('review.worksheetId = :worksheetId', { worksheetId: args.worksheetId })
        }

        if (args.reviewerId) {
            query.andWhere('review.reviewerId = :reviewerId', { reviewerId: args.reviewerId })
        }

        const data = query.getMany()
        return data
    },
}

type GetReviewEntryArgs = {
    reviewId?: string
    id?: string
    worksheetEntryId?: string
}

const reviewEntries = {
    type: new GraphQLList(ReviewEntryType),
    description: 'List of Review Entries',
    args: {
        id: { type: GraphQLString },
        reviewId: { type: GraphQLString },
        worksheetEntryId: { type: GraphQLString },
    },
    resolve: async (_parent, args: GetReviewEntryArgs, context: TContext) => {
        if (!context.authenticatedUserId) return []

        const query = await getConnection()
            .getRepository(entity.ReviewEntry)
            .createQueryBuilder('review-entries')

        if (args.reviewId) {
            query.andWhere('review-entries.reviewId = :reviewId', { reviewId: args.reviewId })
        }

        if (args.worksheetEntryId) {
            query.andWhere('review-entries.worksheetEntryId = :worksheetEntryId', { worksheetEntryId: args.worksheetEntryId })
        }

        if (args.id) {
            query.andWhere('review-entries.id = :id', { id: args.id })
        }

        const data = await query.getMany()
        return data
    },
}

type CompletedStudentReview = {
    worksheetId: string
}

const completedStudentReview = {
    type: new GraphQLList(ReviewForStudentType),
    description: 'List of Reviews for a student',
    args: {
        worksheetId: { type: GraphQLString },
    },
    resolve: async (_parent, args: CompletedStudentReview, context: TContext) => {
        if (!context.authenticatedUserId) return []
        if (!isUUID(args.worksheetId)) return []

        const data = await getConnection()
            .query(`
            select
                worksheet_entry."knownLanguageText",
                worksheet_entry."newLanguageText",
                worksheet_entry."audioUrl",
                coalesce(review_entry."oralFeedback", '') as "oralFeedback",
                coalesce(review_entry."writtenFeedback", '') as "writtenFeedback",
                coalesce("review_entry".id, '') as "reviewEntryId"
            from
                worksheet_entry
            left join
                review_entry on  review_entry."worksheetEntryId" = worksheet_entry.id
            where
                worksheet_entry."worksheetId" = '${args.worksheetId}'
            ;
            `)
        console.log(JSON.stringify(data))
        return data
    },
}

type GetWorksheetEntryArgs = {
    worksheetId?: string
    id?: string
}

const worksheetEntries = {
    type: new GraphQLList(WorksheetEntryType),
    description: 'List of All Worksheet Entries',
    args: {
        id: { type: GraphQLString },
        worksheetId: { type: GraphQLString },
    },
    resolve: async (_parent, args: GetWorksheetEntryArgs, context: TContext) => {
        if (!context.authenticatedUserId) return []

        const query = await getConnection()
            .getRepository(entity.WorksheetEntry)
            .createQueryBuilder('worksheet-entries')

        if (args.worksheetId) {
            query.andWhere('worksheet-entries.worksheetId = :worksheetId', { worksheetId: args.worksheetId })
        }

        if (args.id) {
            query.andWhere('worksheet-entries.id = :id', { id: args.id })
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
        completedStudentReview,
        user,
        reviewer,
        review,
        reviewEntries
    }),
})

export default RootQueryType
