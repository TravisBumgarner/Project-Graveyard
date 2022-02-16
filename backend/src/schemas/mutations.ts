import { getConnection } from 'typeorm';
import {
    GraphQLString,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLInt
} from 'graphql'

import { entity } from '../db'
import { WorksheetType, WorksheetEntryType } from './types'
import { AtLeast, Exactly } from '../../../sharedUtilities'

type AddWorksheetArgs = {
    title: string
    id: string
    description: string
    date: string
}

const addWorksheet = {
    type: WorksheetType,
    description: 'Add a Project',
    args: {
        title: { type: GraphQLNonNull(GraphQLString) },
        id: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        date: { type: GraphQLNonNull(GraphQLString) },
    },
    resolve: async (parent: undefined, args: AddWorksheetArgs) => {
        return await getConnection()
            .getRepository(entity.Worksheet)
            .save({
                ...args
            })
    }
}

type AddWorksheetEntryArgs = {
    text: string
    id: string
    worksheetId: string
}

const addWorksheetEntry = {
    type: WorksheetEntryType,
    description: 'Add a Worksheet Entry',
    args: {
        text: { type: GraphQLNonNull(GraphQLString) },
        id: { type: GraphQLNonNull(GraphQLString) },
        worksheetId: { type: GraphQLNonNull(GraphQLString) },
    },
    resolve: async (parent: undefined, { text, id, worksheetId }: AddWorksheetEntryArgs) => {
        return await getConnection()
            .getRepository(entity.WorksheetEntry)
            .save({
                text,
                id,
                worksheetId
            } as any)
    }
}

const deleteWorksheetEntry = {
    type: WorksheetEntryType,
    description: 'Delete a Worksheet Entry',
    args: {
        id: { type: GraphQLNonNull(GraphQLString) },
    },
    resolve: async (parent: undefined, { id }: Exactly<AddWorksheetEntryArgs, 'id'>) => {
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