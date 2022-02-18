import { getConnection } from 'typeorm';
import {
    GraphQLString,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLInt
} from 'graphql'
import fs from 'fs'
import path from 'path';

import { entity } from '../db'
import { WorksheetType, WorksheetEntryType } from './types'
import { AtLeast, Exactly } from '../../../sharedUtilities'
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
        deleteWorksheetEntry
    })
})

export default RootMutationType