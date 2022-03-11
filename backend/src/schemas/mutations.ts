import { getConnection } from 'typeorm'
import {
    GraphQLString,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLList,
} from 'graphql'

import { entity } from '../db'
import { WorksheetType, WorksheetEntryType, ReviewType } from './types'
import { Exactly } from '../utilities'
import { Context } from '../types'
import cloudinary from '../services/cloudinary'

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
    resolve: async (parent: undefined, args: AddWorksheetArgs, context: Context) => {
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
    resolve: async (parent: undefined, args: AddWorksheetArgs, context: Context) => {
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

type AddReviewArgs = {
    id: string
    date: string
    worksheetId: string
    reviewEntries: {
        id: string
        worksheetEntryId: string
        oralFeedback: string
        writtenFeedback: string
    }[]
}

const addReview = {
    type: ReviewType,
    description: 'Add a Review',
    args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        date: { type: new GraphQLNonNull(GraphQLString) },
        worksheetId: { type: new GraphQLNonNull(GraphQLString) },
        reviewEntries: {
            type: new GraphQLList(new GraphQLInputObjectType({
                name: 'ReviewEntry',
                fields: () => ({
                    id: { type: GraphQLString },
                    worksheetEntryId: { type: GraphQLString },
                    oralFeedback: { type: GraphQLString },
                    writtenFeedback: { type: GraphQLString },
                }),
            })),
        },
    },
    resolve: async (parent: undefined, args: AddReviewArgs, context: Context) => {
        if (!context.authenticatedUserId) return null
        const {
            reviewEntries, id: reviewId, date, worksheetId,
        } = args

        const reviewEntity = new entity.Review()
        reviewEntity.id = reviewId
        reviewEntity.date = date
        reviewEntity.userId = context.authenticatedUserId
        reviewEntity.worksheetId = worksheetId

        const reviewEnetryResponse = await getConnection()
            .getRepository(entity.Review)
            .save(reviewEntity)

        const reviewEntryEntities: entity.ReviewEntry[] = []
        reviewEntries.forEach(({
            id, writtenFeedback, oralFeedback, worksheetEntryId,
        }) => {
            const reviewEntryEntity = new entity.ReviewEntry()
            reviewEntryEntity.id = id
            reviewEntryEntity.writtenFeedback = writtenFeedback
            reviewEntryEntity.oralFeedback = oralFeedback
            reviewEntryEntity.worksheetEntryId = worksheetEntryId
            reviewEntryEntity.reviewId = reviewId

            reviewEntryEntities.push(reviewEntryEntity)
        })

        await getConnection()
            .getRepository(entity.ReviewEntry)
            .save(reviewEntryEntities)

        return reviewEnetryResponse
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
    resolve: async (parent: undefined, args: AddWorksheetEntryArgs, context: Context) => {
        if (!context.authenticatedUserId) return null

        const url = await cloudinary.uploadFile(`${args.worksheetId}/${args.id}.webm`, args.audioUrl)

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
        audioUrl: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async (parent: undefined, args: AddWorksheetEntryArgs, context: Context) => {
        if (!context.authenticatedUserId) return null

        const url = await cloudinary.uploadFile(`${args.worksheetId}/${args.id}.webm`, args.audioUrl)
        console.log('argggs', args)
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
        addWorksheet,
        editWorksheet,
        deleteWorksheet,
        addWorksheetEntry,
        editWorksheetEntry,
        deleteWorksheetEntry,
        addReview,
    }),
})

export default RootMutationType
