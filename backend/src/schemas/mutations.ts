import { getConnection } from 'typeorm';
import {
    GraphQLString,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLList
} from 'graphql'

import { entity } from '../db'
import { WorksheetType, WorksheetEntryType, ReviewType } from './types'
import { Exactly } from '../utilities'
import { Context } from '../types'
import * as cloudinary from '../services/cloudinary'

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
        title: { type: GraphQLNonNull(GraphQLString) },
        id: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        date: { type: GraphQLNonNull(GraphQLString) },
        knownLanguage: { type: GraphQLNonNull(GraphQLString) },
        newLanguage: { type: GraphQLNonNull(GraphQLString) },
    },
    resolve: async (parent: undefined, args: AddWorksheetArgs, context: Context) => {
        if (!context.authenticatedUserId) return null

        const response = await getConnection()
            .getRepository(entity.Worksheet)
            .save({
                ...args,
                userId: context.authenticatedUserId
            })

        return response
    }
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
        id: { type: GraphQLNonNull(GraphQLString) },
        date: { type: GraphQLNonNull(GraphQLString) },
        worksheetId: { type: GraphQLNonNull(GraphQLString) },
        reviewEntries: {
            type: GraphQLList(new GraphQLInputObjectType({
                name: 'ReviewEntry',
                fields: () => ({
                    id: { type: GraphQLString },
                    worksheetEntryId: { type: GraphQLString },
                    oralFeedback: { type: GraphQLString },
                    writtenFeedback: { type: GraphQLString }
                })
            }))
        }
    },
    resolve: async (parent: undefined, args: AddReviewArgs, context: Context) => {
        // if (!context.authenticatedUserId) return null
        console.log(args)
        const { reviewEntries, id: reviewId, date, worksheetId } = args

        const reviewEntity = new entity.Review()
        reviewEntity.id = reviewId
        reviewEntity.date = date
        reviewEntity.userId = context.authenticatedUserId || 'foobar'
        reviewEntity.worksheetId = worksheetId

        const reviewEnetryResponse = await getConnection()
            .getRepository(entity.Review)
            .save(reviewEntity)

        const reviewEntryEntities: entity.ReviewEntry[] = []
        reviewEntries.forEach(({ id, writtenFeedback, oralFeedback, worksheetEntryId }) => {
            const reviewEntryEntity = new entity.ReviewEntry()
            reviewEntryEntity.id = id
            reviewEntryEntity.writtenFeedback = writtenFeedback
            reviewEntryEntity.oralFeedback = oralFeedback
            reviewEntryEntity.worksheetEntryId = worksheetEntryId
            reviewEntryEntity.reviewId = reviewId

            reviewEntryEntities.push(reviewEntryEntity)
        })

        const reviewResponse = await getConnection()
            .getRepository(entity.ReviewEntry)
            .save(reviewEntryEntities)

        return reviewEnetryResponse
    }
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
        knownLanguageText: { type: GraphQLNonNull(GraphQLString) },
        newLanguageText: { type: GraphQLNonNull(GraphQLString) },
        id: { type: GraphQLNonNull(GraphQLString) },
        worksheetId: { type: GraphQLNonNull(GraphQLString) },
        audioUrl: { type: GraphQLNonNull(GraphQLString) },
    },
    resolve: async (parent: undefined, args: AddWorksheetEntryArgs, context: Context) => {
        if (!context.authenticatedUserId) return null

        const url = await cloudinary.uploadFile(`${args.worksheetId}/${args.id}.webm`, args.audioUrl)

        return await getConnection()
            .getRepository(entity.WorksheetEntry)
            .save({
                ...args,
                audioUrl: url
            })
    }
}

const deleteWorksheetEntry = {
    type: WorksheetEntryType,
    description: 'Delete a Worksheet Entry',
    args: {
        id: { type: GraphQLNonNull(GraphQLString) },
    },
    resolve: async (parent: undefined, { id }: Exactly<AddWorksheetEntryArgs, 'id'>, context) => {
        if (!context.authenticatedUserId) return null

        await getConnection()
            .getRepository(entity.WorksheetEntry)
            .delete({
                id
            })
        return {
            id
        }
    }
}


const RootMutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Root Mutation',
    fields: () => ({
        addWorksheet,
        addWorksheetEntry,
        deleteWorksheetEntry,
        addReview
    })
})

export default RootMutationType