import { getConnection, getRepository } from 'typeorm'
import {
    GraphQLString,
    GraphQLNonNull,
    GraphQLObjectType,
} from 'graphql'

import { entity } from '../db'
import { WorksheetType, WorksheetEntryType, ReviewType, UserType, ReviewEntryType } from './types'
import { Exactly, logger } from '../utilities'
import { TContext, TReviewStatus, TWorksheetStatus } from '../types'
import cloudinary from '../services/cloudinary'

const getUrlForFile = async (uploadUrl: string, audioData: string) => {
    if (audioData.includes('cloudinary')) {
        return audioData
    } if (audioData.length === 0) {
        return ''
    }
    const url = await cloudinary.uploadFile(uploadUrl, audioData) || ''
    return url
}

type AddReviewerArgs = {
    reviewerId: string
}
const addReviewer = {
    type: UserType,
    description: 'Add a Reviewer',
    args: {
        reviewerId: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async (parent: undefined, args: AddReviewerArgs, context: TContext) => {
        if (!context.authenticatedUserId) return null
        const user = await getConnection()
            .getRepository(entity.User)
            .createQueryBuilder('user')
            .andWhere('user.id = :userId', { userId: context.authenticatedUserId })
            .getOne()
        const follower = await getConnection()
            .getRepository(entity.User)
            .createQueryBuilder('user')
            .andWhere('user.id = :userId', { userId: args.reviewerId })
            .getOne()

        if (user && follower) {
            const response = await getRepository(entity.User)
                .createQueryBuilder()
                .relation(entity.User, 'followers')
                .of(user)
                .add(follower)
            return response
        }
        logger('Something went wrong adding follower')
        return []
    },
}
const removeReviewer = {
    type: UserType,
    description: 'Remove a Reviewer',
    args: {
        reviewerId: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async (parent: undefined, args: AddReviewerArgs, context: TContext) => {
        if (!context.authenticatedUserId) return null
        const user = await getConnection()
            .getRepository(entity.User)
            .createQueryBuilder('user')
            .andWhere('user.id = :userId', { userId: context.authenticatedUserId })
            .getOne()
        const follower = await getConnection()
            .getRepository(entity.User)
            .createQueryBuilder('user')
            .andWhere('user.id = :userId', { userId: args.reviewerId })
            .getOne()

        if (user && follower) {
            const response = await getRepository(entity.User)
                .createQueryBuilder()
                .relation(entity.User, 'followers')
                .of(user)
                .remove(follower)
            return response
        }
        logger('Something went wrong removing follower')
        return []
    },
}

type AddWorksheetArgs = {
    title: string
    id: string
    description: string
    date: string
    knownLanguage: string
    newLanguage: string
}
const addWorksheet = {
    type: WorksheetType,
    description: 'Add a Project',
    args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        id: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        date: { type: new GraphQLNonNull(GraphQLString) },
        knownLanguage: { type: new GraphQLNonNull(GraphQLString) },
        newLanguage: { type: new GraphQLNonNull(GraphQLString) },
        status: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async (parent: undefined, args: AddWorksheetArgs, context: TContext) => {
        if (!context.authenticatedUserId) return null
        const response = await getConnection()
            .getRepository(entity.Worksheet)
            .save({
                ...args,
                userId: context.authenticatedUserId,
            })

        return response
    },
}
const editWorksheet = {
    type: WorksheetType,
    description: 'Edit a Project',
    args: {
        title: { type: GraphQLString },
        id: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLString },
        date: { type: GraphQLString },
        knownLanguage: { type: GraphQLString },
        newLanguage: { type: GraphQLString },
        status: { type: GraphQLString },
    },
    resolve: async (parent: undefined, args: AddWorksheetArgs, context: TContext) => {
        if (!context.authenticatedUserId) return null
        const response = await getConnection()
            .getRepository(entity.Worksheet)
            .save({
                ...args,
            })

        return response
    },
}

const deleteWorksheet = {
    type: WorksheetType,
    description: 'Delete a Worksheet',
    args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async (parent: undefined, { id }: Exactly<AddWorksheetArgs, 'id'>, context) => {
        if (!context.authenticatedUserId) return null

        await getConnection()
            .getRepository(entity.Worksheet)
            .delete({
                id,
            })
        return {
            id,
        }
    },
}

type UpsertReviewArgs = {
    id: string
    status: TReviewStatus
    reviewerId: string
    worksheetId?: string
    date: string
}

const upsertReview = {
    type: ReviewType,
    description: 'Upsert a Review',
    args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        worksheetId: { type: GraphQLString },
        status: { type: GraphQLString },
        date: { type: GraphQLString },
        reviewerId: { type: GraphQLString },
    },
    resolve: async (parent: undefined, args: UpsertReviewArgs, context: TContext) => {
        if (!context.authenticatedUserId) return null

        if (args.worksheetId && args.status === TReviewStatus.REVIEW_COMPLETED) {
            await getConnection()
                .getRepository(entity.Worksheet)
                .save({
                    id: args.worksheetId,
                    status: TWorksheetStatus.HAS_REVIEWS
                })
        }

        const response = await getConnection()
            .getRepository(entity.Review)
            .save({
                ...args,
            })

        return response
    },
}

const deleteReview = {
    type: ReviewType,
    description: 'Delete a Review',
    args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async (parent: undefined, args: Exactly<UpsertReviewArgs, 'id'>, context: TContext) => {
        if (!context.authenticatedUserId) return null

        await getConnection()
            .getRepository(entity.Review)
            .delete({
                id: args.id,
            })
        return {
            id: args.id,
        }
    },
}

type AddReviewEntryArgs = {
    id: string
    reviewId: string
    worksheetEntryId: string
    oralFeedback: string
    writtenFeedback: string
}

const addReviewEntry = {
    type: ReviewEntryType,
    description: 'Add a Review Entry',
    args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        reviewId: { type: new GraphQLNonNull(GraphQLString) },
        worksheetEntryId: { type: new GraphQLNonNull(GraphQLString) },
        oralFeedback: { type: new GraphQLNonNull(GraphQLString) },
        writtenFeedback: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async (parent: undefined, args: AddReviewEntryArgs, context: TContext) => {
        if (!context.authenticatedUserId) return null
        const url = await getUrlForFile(`${args.reviewId}/${args.id}.webm`, args.oralFeedback)

        return getConnection()
            .getRepository(entity.ReviewEntry)
            .save({
                ...args,
                audioUrl: url,
            })
    },
}

const editReviewEntry = {
    type: ReviewEntryType,
    description: 'Edit a Review Entry',
    args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        worksheetEntryId: { type: new GraphQLNonNull(GraphQLString) },
        oralFeedback: { type: new GraphQLNonNull(GraphQLString) },
        writtenFeedback: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async (parent: undefined, args: AddReviewEntryArgs, context: TContext) => {
        if (!context.authenticatedUserId) return null

        const url = await getUrlForFile(`${args.reviewId} /${args.id}.webm`, args.oralFeedback)

        return getConnection()
            .getRepository(entity.ReviewEntry)
            .save({
                ...args,
                audioUrl: url,
            })
    },
}

const deleteReviewEntry = {
    type: ReviewEntryType,
    description: 'Delete a Review Entry',
    args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async (parent: undefined, { id }: Exactly<AddReviewEntryArgs, 'id'>, context) => {
        if (!context.authenticatedUserId) return null

        await getConnection()
            .getRepository(entity.Worksheet)
            .delete({
                id,
            })
        return {
            id,
        }
    },
}

type AddWorksheetEntryArgs = {
    knownLanguageText: string
    newLanguageText: string
    id: string
    worksheetId: string
    audioUrl: string
}
const addWorksheetEntry = {
    type: WorksheetEntryType,
    description: 'Add a Worksheet Entry',
    args: {
        knownLanguageText: { type: new GraphQLNonNull(GraphQLString) },
        newLanguageText: { type: new GraphQLNonNull(GraphQLString) },
        id: { type: new GraphQLNonNull(GraphQLString) },
        worksheetId: { type: new GraphQLNonNull(GraphQLString) },
        audioUrl: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async (parent: undefined, args: AddWorksheetEntryArgs, context: TContext) => {
        if (!context.authenticatedUserId) return null
        const url = await getUrlForFile(`${args.worksheetId} / ${args.id}.webm`, args.audioUrl)

        return getConnection()
            .getRepository(entity.WorksheetEntry)
            .save({
                ...args,
                audioUrl: url,
            })
    },
}

const editWorksheetEntry = {
    type: WorksheetEntryType,
    description: 'Edit a Worksheet Entry',
    args: {
        knownLanguageText: { type: new GraphQLNonNull(GraphQLString) },
        newLanguageText: { type: new GraphQLNonNull(GraphQLString) },
        id: { type: new GraphQLNonNull(GraphQLString) },
        worksheetId: { type: new GraphQLNonNull(GraphQLString) },
        audioUrl: { type: GraphQLString },
    },
    resolve: async (parent: undefined, args: AddWorksheetEntryArgs, context: TContext) => {
        if (!context.authenticatedUserId) return null

        const url = await getUrlForFile(`${args.worksheetId} /${args.id}.webm`, args.audioUrl)

        return getConnection()
            .getRepository(entity.WorksheetEntry)
            .save({
                ...args,
                audioUrl: url,
            })
    },
}

const deleteWorksheetEntry = {
    type: WorksheetEntryType,
    description: 'Delete a Worksheet Entry',
    args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async (parent: undefined, { id }: Exactly<AddWorksheetEntryArgs, 'id'>, context) => {
        if (!context.authenticatedUserId) return null

        await getConnection()
            .getRepository(entity.WorksheetEntry)
            .delete({
                id,
            })
        return {
            id,
        }
    },
}

const RootMutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Root Mutation',
    fields: () => ({
        addReviewer,
        removeReviewer,
        addWorksheet,
        editWorksheet,
        deleteWorksheet,
        addWorksheetEntry,
        editWorksheetEntry,
        deleteWorksheetEntry,
        addReviewEntry,
        editReviewEntry,
        deleteReviewEntry,
        upsertReview,
        deleteReview,
    }),
})

export default RootMutationType
