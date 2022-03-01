import { getConnection } from 'typeorm';
import {
    GraphQLString,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLList
} from 'graphql'
import fs from 'fs'
import path from 'path';

import { entity } from '../db'
import { WorksheetType, WorksheetEntryType, ReviewType, ReviewEntryType } from './types'
import { Exactly } from '../utilities'
import { Context } from '../types'

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
        foo: { type: GraphQLList(GraphQLString) }
        // reviewEntries: { type: GraphQLList(ReviewEntryType) } // this isn'r correct
    },
    resolve: async (parent: undefined, args: AddReviewArgs, context: Context) => {
        // if (!context.authenticatedUserId) return null

        const { reviewEntries, id: reviewId, date } = args

        const reviewEntity = new entity.Review()
        reviewEntity.id = reviewId
        reviewEntity.date = date
        reviewEntity.userId = context.authenticatedUserId || 'foobar'

        // const reviewEntryEntities: entity.ReviewEntry[] = []
        // reviewEntries.forEach(({ id, writtenFeedback, oralFeedback, worksheetEntryId }) => {
        //     const reviewEntryEntity = new entity.ReviewEntry()
        //     reviewEntryEntity.id = id
        //     reviewEntryEntity.writtenFeedback = writtenFeedback
        //     reviewEntryEntity.oralFeedback = oralFeedback
        //     reviewEntryEntity.worksheetEntryId = worksheetEntryId
        //     reviewEntryEntity.reviewId = reviewId

        //     reviewEntryEntities.push(reviewEntryEntity)
        // })

        // const reviewResponse = await getConnection()
        //     .getRepository(entity.ReviewEntry)
        //     .save(reviewEntryEntities)


        const reviewEnetryResponse = await getConnection()
            .getRepository(entity.Review)
            .save(reviewEntity)

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

        const savePath = path.join(__dirname, `../../public/recordings/${args.worksheetId}`)

        if (!fs.existsSync(savePath)) {
            fs.mkdirSync(savePath);
        }
        fs.writeFileSync(path.join(savePath, `${args.id}.webm`), Buffer.from(args.audioUrl.replace("data:audio/webm;base64,", ''), 'base64'));

        return await getConnection()
            .getRepository(entity.WorksheetEntry)
            .save({
                ...args,
                audioUrl: "cats.com"
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